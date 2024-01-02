const User = require("../../models/User");

async function handleRejectFriendRequest(message, socket) {
  const currentUser = await User.findById(message.currentUser);
  const targetUser = await User.findById(message.targetUser);

  // remove currentUser's id from targetUser's sentFriendRequests
  targetUser.sentFriendRequests = targetUser.sentFriendRequests.filter(
    (_id) => _id.toString() !== currentUser._id.toString()
  );

  // remove targetUser's id from currentUser's friendRequests
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (_id) => _id.toString() !== targetUser._id.toString()
  );

  await Promise.all([currentUser.save(), targetUser.save()]);
}

module.exports = handleRejectFriendRequest;
