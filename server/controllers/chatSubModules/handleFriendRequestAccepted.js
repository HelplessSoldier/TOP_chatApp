const User = require("../../models/User");

async function handleFriendRequestAccept(message, socket) {
  const currentUser = await User.findById(message.currentUser);
  const targetUser = await User.findById(message.targetUser);

  // add targetUser's id to currentUsers friend list.
  currentUser.friends.push(targetUser._id);

  // add currentUsers id to targetUser's friend list.
  targetUser.friends.push(currentUser._id);

  // remove currentUser's id from targetUser's sentFriendRequests
  targetUser.sentFriendRequests = targetUser.sentFriendRequests.filter(
    (_id) => _id.toString() !== currentUser._id.toString()
  );

  // remove targetUser's id from currentUser's friendRequests
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (_id) => _id.toString() !== targetUser._id.toString()
  );

  await Promise.all([currentUser.save(), targetUser.save()]);

  socket.send(
    JSON.stringify({
      message: "Removed user from friendRequests",
      targetId: targetUser._id,
    })
  );
}

module.exports = handleFriendRequestAccept;
