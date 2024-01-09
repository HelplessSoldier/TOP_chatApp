const User = require("../../models/User");
const Chat = require("../../models/Chat");
const jwt = require("jsonwebtoken");
const getCookieFromString = require("../../helpers/getCookieFromString");
require("dotenv").config();

async function handleNewChatMessage(message, userSocketMap) {
  try {
    const chatMessage = message.body;

    const token = getCookieFromString(message.token, "jwt");
    const userInfo = jwt.verify(token, process.env.secret);
    const userId = userInfo.userId;

    const currentUser = await User.findById(userId);
    const currentChat = await Chat.findById(message.chatId);
    const participants = currentChat.participants;

    if (!participants.includes(currentUser._id)) {
      console.log("user attempted to submit to chat without being participant");
      return;
    }

    const messageObject = {
      sentByUsername: currentUser.username,
      sentById: currentUser._id,
      messageBody: chatMessage,
      timestamp: Date.now(),
    };

    const responseObject = {
      message: "New chat message received",
      messageObject,
    };

    currentChat.messages.push(messageObject);
    await currentChat.save();

    participants.map((userId) => {
      const currentSocket = userSocketMap[userId];
      currentSocket.send(JSON.stringify(responseObject));
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = handleNewChatMessage;
