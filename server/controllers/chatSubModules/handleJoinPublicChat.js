const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
require("dotenv").config();

async function handleJoinPublicChat(message, socket) {
  try {
    const userId = jwt.verify(message.jwt, process.env.secret).userId;
    const user = await User.findById(userId);
    const chat = await Chat.findById(message.chatId);

    if (!chat.instanceType === "public") {
      socket.send(
        JSON.stringify({
          message: "Failed to join chat",
          detail: "Chat not public",
        })
      );
      return;
    }

    user.chats.push(chat._id);
    chat.participants.push(user._id);

    await Promise.all([user.save(), chat.save()]);

    socket.send(
      JSON.stringify({
        message: "Successfully joined chat",
        chatId: chat._id,
      })
    );
  } catch (err) {
    console.error(err);
    socket.send(
      JSON.stringify({
        message: "Failed to join chat",
        detail: "Internal server error",
      })
    );
  }
}

module.exports = handleJoinPublicChat;
