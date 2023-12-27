const User = require('../../models/User');
const Chat = require('../../models/Chat');

async function handleSearch(message, socket) {
  console.log(`got search request with data: ${message.searchTerm}`)
  const searchTerm = message.searchTerm;
  const searchRegex = new RegExp(searchTerm, 'i');
  const foundUsers = await User.find({ username: searchRegex });
  const foundChats = await Chat.find({ name: searchRegex });
  let returnObject = {};
  if (foundUsers.length === 0 && foundChats.length === 0) {
    returnObject.message = 'No items found'
  } else {
    returnObject.message = 'Found items';
    returnObject.users = foundUsers;
    returnObject.chats = foundChats;
  }
  const returnMessage = JSON.stringify(returnObject);
  console.log(socket)
  socket.send(returnMessage);
}

module.exports = handleSearch
