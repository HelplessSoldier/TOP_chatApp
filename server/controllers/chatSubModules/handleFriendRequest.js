const User = require('../../models/User');

function handleFriendRequest(message, socket) {
  console.log('hi from handleFriendRequest!');
  console.log(message);
  return;
}

module.exports = handleFriendRequest;
