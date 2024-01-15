const User = require("../../models/User");
const Chat = require("../../models/Chat");
const getCookieFromString = require("../../helpers/getCookieFromString");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function sendCurrentChat(message, socket) {
  try {
    const tokenCookie = message.token;
    const token = getCookieFromString(tokenCookie, "jwt");
    const userInfo = jwt.verify(token, process.env.secret);
    const userId = userInfo.userId;
    const requestingUser = await User.findById(userId);
    const currentChatId = requestingUser.currentChat;
    const requestedChat = await Chat.findById(currentChatId);

    let responseMessage = null;
    if (requestedChat !== null) {
      const chatObject = requestedChat.toObject();
      responseMessage = {
        message: "Chat found",
        chatObject,
      };
    } else {
      responseMessage = {
        message: "No chat found",
      };
    }

    socket.send(JSON.stringify(responseMessage));
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendCurrentChat;
