const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const canJoinChat = require('./canJoinChat');
require("dotenv").config();

async function handleJoinSearchedChat(message, socket) {
  try {
    const userId = jwt.verify(message.jwt, process.env.secret).userId;
    const user = await User.findById(userId);
    const chat = await Chat.findById(message.chatId);

    if (!canJoinChat(user, chat)) {
      socket.send(
        JSON.stringify({
          message: "Failed to join chat",
          detail: "User doesn't have permission to join this chat",
        })
      );
      return;
    }

    user.chats.push(chat._id);
    user.currentChat = chat._id;
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

module.exports = handleJoinSearchedChat;
