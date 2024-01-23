const getCookieFromString = require("../../helpers/getCookieFromString");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function handleConnect(socket, req, userSocketMap) {
  let currentUser = null;
  try {
    const cookies = req.headers.cookie;
    const secret = process.env.secret;
    const token = getCookieFromString(cookies, "jwt");
    if (!token) {
      return;
    }
    const jwtPayload = jwt.verify(token, secret);
    const uid = jwtPayload.userId;
    currentUser = await User.findById(uid);
  } catch (err) {
    console.error(err);
  }

  if (currentUser === null) {
    socket.send(JSON.stringify({ message: "No user" }));
  } else {
    userSocketMap[currentUser._id] = socket;
    socket.send(
      JSON.stringify({
        message: "User successfully verified",
        _id: currentUser._id,
        username: currentUser.username,
        friends: currentUser.friends,
        friendRequests: currentUser.friendRequests,
        sentFriendRequests: currentUser.sentFriendRequests,
        chats: currentUser.chats,
        chatInvites: currentUser.chatInvites,
        currentChat: currentUser.currentChat,
      })
    );
  }
}

module.exports = handleConnect;
