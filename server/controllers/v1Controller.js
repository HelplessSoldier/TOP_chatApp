const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.root_get = (req, res, next) => {
  res.send("hi! this is the controller");
};

exports.user_get = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenPayload = jwt.verify(token, process.env.secret)
  const userId = tokenPayload.userId;
  const currentUser = await User.findById(userId)
  console.log(currentUser);
  res.json({ message: "sup" });
});
