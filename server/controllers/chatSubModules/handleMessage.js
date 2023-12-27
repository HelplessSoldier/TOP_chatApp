const handleSearch = require("./handleSearch");

function handleMessage(message, socket) {
  switch (message.message) {
    case "Search request":
      handleSearch(message);
  }
}

module.exports = handleMessage;
