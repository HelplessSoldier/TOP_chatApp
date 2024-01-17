const User = require("../../models/User");
const Chat = require("../../models/Chat");
const canJoinChat = require("./canJoinChat");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleSearch(message, socket) {
  const userId = jwt.verify(
    message.token.split("=")[1],
    process.env.secret
  ).userId;
  const currentUser = await User.findById(userId);

  const searchTerm = message.searchTerm;

  if (searchTerm === "") {
    socket.send(JSON.stringify({ message: "No items found" }));
    return;
  }

  const searchRegex = new RegExp(searchTerm, "i");
  const foundUsers = await User.find({ username: searchRegex });

  // i'd like this to be filtered by canJoinChat (returns bool)
  const foundChats = await Chat.find({ name: searchRegex });

  let returnObject = {};
  if (foundUsers.length === 0 && foundChats.length === 0) {
    returnObject.message = "No items found";
  } else {
    returnObject.message = "Found items";

    const strippedUsers = foundUsers.map((user) => {
      const { _id, username } = user.toObject();
      return { _id, username };
    });

    returnObject.searchTerm = searchTerm;
    returnObject.users = strippedUsers;
    returnObject.chats = foundChats;
  }

  const returnMessage = JSON.stringify(returnObject);
  socket.send(returnMessage);
}

module.exports = handleSearch;
