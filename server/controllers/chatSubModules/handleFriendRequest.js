const User = require("../../models/User");

async function handleFriendRequest(message, socket) {
  const sentByUser = await User.findById(message.sentById);
  const targetUser = await User.findById(message.targetId);

  if (!targetUser.friendRequests.includes(sentByUser._id)) {
    targetUser.friendRequests.push(sentByUser._id);
    await targetUser.save();
    console.log(
      `User: ${sentByUser.username} requested friend from: ${targetUser.username}`
    );
  } else {
    console.log(`Already has friend request by user: ${sentByUser.username}`);
  }
}

module.exports = handleFriendRequest;
