const WebSocket = require("ws");
const asyncHandler = require("express-async-handler");
const handleMessage = require("./chatSubModules/handleMessage");
const handleConnect = require("./chatSubModules/handleConnect");
require("dotenv").config();

const server = new WebSocket.Server({ port: 8888 });

server.on("connection", (ws, req) => {
  handleConnect(ws, req);

  try {
    ws.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      handleMessage(parsedMessage, ws);
    });
  } catch (err) {
    console.error(err);
  }

  ws.on("close", () => console.log("Client disconnected"));
});

exports.connect_get = (req, res) => {
  // idk why but the server crashes without this route.
  // it's not actually used for anything but don't delete
  // without figuring out what's going on with it first.
  res.json({ message: "got into connect_get!" });
};
