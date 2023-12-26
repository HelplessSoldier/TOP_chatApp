const WebSocket = require("ws");
const getCookieFromString = require("../helpers/getCookieFromString");

const server = new WebSocket.Server({ port: 8888 });

server.on("connection", (ws, req) => {
  console.log("Client connected!");

  const cookies = req.headers.cookie
  const jwt = getCookieFromString(cookies, 'connect.sid')
  console.log(jwt)

  ws.on("message", (message) => {
    console.log(`Got message: ${message}`);
    ws.send({ message: "Hello from the server!" });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

exports.connect_get = (req, res, next) => {
  res.json({ message: "got into connect_get!" });
};
