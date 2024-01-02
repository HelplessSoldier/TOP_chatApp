const User = require("../../models/User");

async function handleFriendRequest(message, socket) {
  const sentByUser = await User.findById(message.sentById);
  const targetUser = await User.findById(message.targetId);

  if (!targetUser.friendRequests.includes(sentByUser._id)) {
    targetUser.friendRequests.push(sentByUser._id);
    sentByUser.sentFriendRequests.push(targetUser._id);
    await targetUser.save();
    await sentByUser.save();
    socket.send(
      JSON.stringify({
        message: "Friend request successfully sent",
        recipient: targetUser._id,
      })
    );
  } else {
    socket.send(
      JSON.stringify({
        message: "Already has friend request from user",
        recipient: targetUser._id,
      })
    );
  }
}

module.exports = handleFriendRequest;
