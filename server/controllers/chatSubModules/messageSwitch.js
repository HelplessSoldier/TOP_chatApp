const handleSearch = require("./handleSearch");
const handleFriendRequest = require("./handleFriendRequest");
const handleFriendRequestReject = require("./handleRejectFriendRequest");
const handleFriendRequestAccept = require("./handleFriendRequestAccepted");
const handleSwitchChatRequest = require("./handleSwitchChatRequest");
const handleDisconnect = require("./handleDisconnect");
const sendCurrentChat = require("./sendCurrentChat");

function messageSwitch(message, socket, userSocketMap) {
  switch (message.message) {
    case "Search request":
      handleSearch(message, socket);
      break;
    case "Friend request sent":
      handleFriendRequest(message, socket);
      break;
    case "Friend request rejected":
      handleFriendRequestReject(message, socket);
      break;
    case "Friend request accepted":
      handleFriendRequestAccept(message, socket);
      break;
    case "Switch chat request":
      handleSwitchChatRequest(message, socket);
      break;
    case "User closed socket":
      handleDisconnect(message, userSocketMap);
      break;
    case "User requesting current chat":
      sendCurrentChat(message, socket);
      break;
    default:
      console.log(`Unknown message received: ${message.message}`);
  }
}

module.exports = messageSwitch;
