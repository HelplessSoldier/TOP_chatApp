const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.root_get = (req, res, next) => {
  res.send("hi! this is the controller");
};

exports.currentUser_get = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenPayload = jwt.verify(token, process.env.secret);
  const userId = tokenPayload.userId;
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    res.json({ message: "Error: User not found" });
    return;
  }

  const userObject = currentUser.toObject();
  delete userObject.password;

  res.json({ message: "Successfully retrieved user", user: userObject });
});

exports.user_get = asyncHandler(async (req, res, next) => {
  const foundUser = await User.findById(req.params.userid);

  if (!foundUser) {
    res.json({ message: "User not found" });
    return;
  }

  const userObject = foundUser.toObject();
  delete userObject.password;
  res.json({ message: "User found", user: userObject });
});

exports.chat_get = asyncHandler(async (req, res, next) => {
  const foundChat = await Chat.findById(req.params.chatid);

  if (!foundChat) {
    res.json({ message: "Chat not found" });
    return;
  }

  const chatObject = foundChat.toObject();
  res.json({ message: "Chat found", chat: chatObject });
});

exports.chat_delete = asyncHandler(async (req, res, next) => {
  console.log("got into chat_delete, unimplimented");
  res.json({ message: "got into chat delete" });
});
