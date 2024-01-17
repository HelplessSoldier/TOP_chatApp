async function canJoinChat(user, chat) {
  // instance types: ["public", "friends", "friendsPlus", "invite", "invitePlus"],

  if (chat.instanceType === "public") {
    // anyone can join pubs
    return true;
  }

  if (chat.instanceType === "friends") {
    // only friends of the owner can join
    const ownerId = chat.owner;
    const owner = await User.findById(ownerId);
    const userIsFriendOfOwner = owner.friends.includes(user._id);
    return userIsFriendOfOwner;
  }

  if (chat.instanceType === "friendsPlus") {
    // friends of any participant can join
    let hasFriendInChat = false;
    for (let participantId of chat.participants) {
      const currentParticipant = await User.findById(participantId);
      if (currentParticipant.friends.includes(user._id)) {
        hasFriendInChat = true;
      }
    }
    return hasFriendInChat;
  }
  return false;
}

module.exports = canJoinChat;
