const jwt = require('jsonwebtoken');
const getCookieFromString = require('../../helpers/getCookieFromString');
require('dotenv').config();

function handleDisconnect(message, userSocketMap) {
  const token = getCookieFromString(message.token, 'jwt')
  const userInfo = jwt.verify(token, process.env.secret)
  const userId = userInfo.userId;
  if (userSocketMap[userId]) {
    delete userSocketMap[userId];
  }
}

module.exports = handleDisconnect;
