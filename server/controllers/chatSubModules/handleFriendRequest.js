const User = require("../../models/User");

async function handleFriendRequest(message, socket) {
  const sentByUser = await User.findById(message.sentById);
  const targetUser = await User.findById(message.targetId);

  console.log(sentByUser, targetUser);

  return;
}

module.exports = handleFriendRequest;
