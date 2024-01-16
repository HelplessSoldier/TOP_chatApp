const User = require("../../models/User.js");
const Chat = require("../../models/Chat.js");

async function handleChatInviteAccept(message, socket) {
  try {
    const user = await User.findById(message.userId);
    const chat = await Chat.findById(message.chatId);

    if (!user || !chat) {
      socket.send(
        JSON.stringify({
          message: "Failed to add chat",
          detail: "User or chat not found",
        })
      );
      console.error(
        `One not found: user not found -> ${!user} chat not found -> ${!chat}`
      );
      return;
    }

    if (user.chats.includes(chat._id)) {
      socket.send(
        JSON.stringify({
          message: "Failed to add chat",
          detail: "User already participant of chat",
        })
      );
      console.error("User already has chat")
      return;
    }

    // add chats id to user and remove the invite
    user.chats.push(chat._id);

    // this isn't removing the chat invite?
    console.log("Before filter: ", user.chatInvites);
    user.chatInvites = user.chatInvites.filter(
      (chatInvite) => chatInvite.chatid.toString() !== chat._id.toString()
    );
    console.log("After filter: ", user.chatInvites);

    await user.save();

    socket.send(
      JSON.stringify({
        message: "Remove chat invite",
        chatId: message.chatId,
      })
    );
  } catch (err) {
    console.error(err);
    socket.send(
      JSON.stringify({
        message: "Failed to add chat",
        detail: "Internal server error",
      })
    );
  }
}

module.exports = handleChatInviteAccept;
