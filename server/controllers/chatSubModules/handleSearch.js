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
  const searchTerm = message.searchTerm;

  if (searchTerm === "") {
    socket.send(JSON.stringify({ message: "No items found" }));
    return;
  }

  const searchRegex = new RegExp(searchTerm, "i");
  const foundUsers = await User.find({ username: searchRegex });

  const currentUser = await User.findById(userId);
  const foundChats = await Chat.find({ name: searchRegex });
  const filteredChats = await Promise.all(
    foundChats.map(async (chat) => ({
      ...chat.toObject(),
      canJoin: await canJoinChat(currentUser, chat)
    }))
  )

  let returnObject = {};
  if (foundUsers.length === 0 && filteredChats.length === 0) {
    returnObject.message = "No items found";
  } else {
    returnObject.message = "Found items";

    const strippedUsers = foundUsers.map((user) => {
      const { _id, username } = user.toObject();
      return { _id, username };
    });

    returnObject.searchTerm = searchTerm;
    returnObject.users = strippedUsers;
    returnObject.chats = filteredChats;
  }

  const returnMessage = JSON.stringify(returnObject);
  socket.send(returnMessage);
}

module.exports = handleSearch;
