const User = require("../../models/User");
const Chat = require("../../models/Chat");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleSwitchChatRequest(message, socket) {
  try {
    const secret = process.env.secret;

    const userInfo = jwt.verify(message.token, secret);
    const userId = userInfo.userId;
    const requestingUser = await User.findById(userId);

    const chatId = message.chatId;
    const requestedChat = await Chat.findById(chatId);

    if (!requestedChat.participants.includes(userId)) {
      socket.send({ message: "User is not in requested chat" });
      return;
    }

    requestingUser.currentChat = requestedChat._id;
    await requestingUser.save();
    socket.send(
      JSON.stringify({
        message: "Successfully switched chat",
        chatId: requestedChat._id,
      })
    );
  } catch (err) {
    console.error(err);
    socket.send(JSON.stringify({ message: "Failed to switch chat" }));
  }
}

module.exports = handleSwitchChatRequest;
