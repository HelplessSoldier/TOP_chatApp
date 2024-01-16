const User = require("../../models/User");

async function handleChatInviteReject(message, socket) {
  try {
    const user = await User.findById(message.userId);
    const chatIdToRemove = message.chatId;

    user.chatInvites = user.chatInvites.filter(
      (chatInvite) => chatInvite.chatid.toString() !== chatIdToRemove.toString()
    );

    await user.save();

    // sent success message if ok
    socket.send(
      JSON.stringify({
        message: "Remove chat invite",
        chatId: chatIdToRemove,
      })
    );
  } catch (err) {
    console.error(err);
    socket.send(
      JSON.stringify({
        message: "Failed to remove chat invite",
        detail: "Internal server error",
      })
    );
  }
}

module.exports = handleChatInviteReject;
