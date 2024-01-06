function sendMessageToUser(userId, message, userSocketMap) {
  const userSocket = userSocketMap[userId];
  if (userSocket) {
    userSocket.send(JSON.stringify(message));
  }
}

module.exports = sendMessageToUser;
