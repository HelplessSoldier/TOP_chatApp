const WebSocket = require("ws");
const getCookieFromString = require("../helpers/getCookieFromString");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const handleMessage = require("./chatSubModules/handleMessage");
require("dotenv").config();

const server = new WebSocket.Server({ port: 8888 });

server.on(
  "connection",
  asyncHandler(async (ws, req) => {
    console.log('Client connected')
    let currentUser = null;
    try {
      const cookies = req.headers.cookie;
      const secret = process.env.secret;
      const token = getCookieFromString(cookies, "jwt");
      const jwtPayload = jwt.verify(token, secret);
      const uid = jwtPayload.userId;
      currentUser = await User.findById(uid);
    } catch (err) {
      console.error(err);
    }

    if (currentUser === null) {
      ws.send(JSON.stringify({ message: "No user" }));
    } else {
      ws.send(
        JSON.stringify({
          message: "User successfully verified",
          username: currentUser.username,
          friends: currentUser.friends,
          chats: currentUser.chats,
        })
      );
    }

    ws.on("message", (message) => {
      console.log(`Got message: ${message}`);
      const parsedMessage = JSON.parse(message);
      handleMessage(parsedMessage, ws)
    });

    ws.on('close', () => console.log('Client disconnected'))
  })
);

exports.connect_get = (req, res, next) => {
  res.json({ message: "got into connect_get!" });
};
