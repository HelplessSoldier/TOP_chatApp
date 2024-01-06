const WebSocket = require("ws");
const asyncHandler = require("express-async-handler");
const messageSwitch = require("./chatSubModules/messageSwitch");
const handleConnect = require("./chatSubModules/handleConnect");
const getCookieFromString = require("../helpers/getCookieFromString");
const jwt = require("jsonwebtoken");
const Chat = require("../models/Chat");
const User = require("../models/User");
require("dotenv").config();

const userSocketMap = {};
const server = new WebSocket.Server({ port: 8888 });

server.on("connection", (ws, req) => {
  handleConnect(ws, req, userSocketMap);

  try {
    ws.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      messageSwitch(parsedMessage, ws);
    });
  } catch (err) {
    console.error(err);
  }

  ws.on("close", () => console.log("Client disconnected"));
});

exports.new_chat_post = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const secret = process.env.secret;
    const token = getCookieFromString(body.token, "jwt");
    const { userId } = jwt.verify(token, secret);
    const user = await User.findById(userId);

    if (!user) {
      res.json({ message: "User not found" });
    }

    const newChat = new Chat({
      name: body.chatName,
      owner: user._id,
      instanceType: body.chatType,
    });

    newChat.participants.push(user._id);
    user.chats.push(newChat._id);
    user.ownedChats.push(newChat._id);
    user.currentChat = newChat._id;

    await newChat.save();
    await user.save();

    res.json({ message: "Chat created" })

  } catch (err) {
    console.error(err);
  }
});

exports.connect_get = (req, res) => {
  // idk why but the server crashes without this route.
  // it's not actually used for anything but don't delete
  // without figuring out what's going on with it first.
  res.json({ message: "got into connect_get!" });
};
