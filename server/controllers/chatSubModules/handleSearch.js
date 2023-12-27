function handleSearch(message, socket) {
  console.log(`got search request with data: ${message.searchTerm}`)
}

module.exports = handleSearch
