const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const handleMessage = require("./chatSubModules/handleMessage");
const handleConnect = require('./chatSubModules/handleConnect');
require("dotenv").config();

const server = new WebSocket.Server({ port: 8888 });

server.on(
  "connection",
  asyncHandler(async (ws, req) => {
    handleConnect(ws, req);

    ws.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      handleMessage(parsedMessage, ws)
    });

    ws.on('close', () => console.log('Client disconnected'))
  })
);

exports.connect_get = (req, res, next) => {
  res.json({ message: "got into connect_get!" });
};

