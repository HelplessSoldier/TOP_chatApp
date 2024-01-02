const getCookieFromString = require("../../helpers/getCookieFromString");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function handleConnect(socket, req) {
  console.log("Client connected");
  let currentUser = null;
  try {
    const cookies = req.headers.cookie;
    const secret = process.env.secret;
    const token = getCookieFromString(cookies, "jwt");
    const jwtPayload = jwt.verify(token, secret);
    const uid = jwtPayload.userId;
    currentUser = await User.findById(uid);
  } catch (err) {
    console.error(err);
  }

  if (currentUser === null) {
    socket.send(JSON.stringify({ message: "No user" }));
  } else {
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
      })
    );
  }
}

module.exports = handleConnect;
