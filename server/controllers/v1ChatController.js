const WebSocket = require("ws");
const getCookieFromString = require("../helpers/getCookieFromString");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

const server = new WebSocket.Server({ port: 8888 });

server.on(
  "connection",
  asyncHandler(async (ws, req) => {
    let currentUser = null;
    try {
      const cookies = req.headers.cookie;
      const secret = process.env.secret;
      const token = getCookieFromString(cookies, "jwt");
      const jwtPayload = jwt.verify(token, secret);
      const uid = jwtPayload.userId;
      currentUser = await User.findById(uid);
    } catch (err) {
      console.error(err);
    }

    if (currentUser === null) {
      ws.send(JSON.stringify({ message: "No user" }));
    } else {
      ws.send(
        JSON.stringify({
          message: "User successfully verified",
          username: currentUser.username,
        })
      );
    }

    ws.on("message", (message) => {
      console.log(`Got message: ${message}`);
      ws.send({ message: "Hello from the server!" });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  })
);

exports.connect_get = (req, res, next) => {
  res.json({ message: "got into connect_get!" });
};
