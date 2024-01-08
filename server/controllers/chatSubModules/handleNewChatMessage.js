const User = require("../../models/User");
const Chat = require("../../models/Chat");
const jwt = require("jsonwebtoken");
const getCookieFromString = require("../../helpers/getCookieFromString");
require("dotenv").config();

async function handleNewChatMessage(message, userSocketMap) {
  const chatMessage = message.body;
  const token = getCookieFromString(message.token, "jwt");
  const userInfo = jwt.verify(token, process.env.secret);
  const userId = userInfo.userId;
  const currentUser = await User.findById(userId);
  const currentChat = await Chat.findById(message.chatId);
  const participants = currentChat.participants;

  const messageObject = {
    message: "New chat message received",
    sentByUsername: currentUser.username,
    sentById: currentUser._id,
    messageBody: chatMessage,
  };

  participants.map((userId) => {
    const currentSocket = userSocketMap[userId];
    currentSocket.send(JSON.stringify(messageObject))
  });
}

module.exports = handleNewChatMessage;
