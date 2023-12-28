const handleSearch = require("./handleSearch");
const handleFriendRequest = require('./handleFriendRequest');

function handleMessage(message, socket) {
  switch (message.message) {
    case "Search request":
      handleSearch(message, socket);
      break;
    case "Friend request sent":
      handleFriendRequest(message, socket);
      break;
    default:
      console.log(`Unknown message received: ${message.message}`)
  }
}

module.exports = handleMessage;
