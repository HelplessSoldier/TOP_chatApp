const User = require('../../models/User');
const Chat = require('../../models/Chat');

function handleSearch(message, socket) {
  console.log(`got search request with data: ${message.searchTerm}`)
  const searchTerm = message.searchTerm;
  const searchRegex = new RegExp(searchTerm, 'i');
}

module.exports = handleSearch
