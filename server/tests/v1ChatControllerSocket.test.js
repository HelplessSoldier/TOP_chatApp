const mongoose = require("mongoose");
const messageSwitch = require("../controllers/chatSubModules/messageSwitch");
const handleConnect = require("../controllers/chatSubModules/handleConnect");
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Chat = require("../models/Chat");
const express = require("express");
const cookieParser = require("cookie-parser");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

let mongod;
const secret = process.env.secret; // using actual secret as it's also used in the controller
let server;
let userSocketMap;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri);

  userSocketMap = {};
  server = new WebSocket.Server({ port: 8888 });

  server.on("connection", (ws, req) => {
    handleConnect(ws, req, userSocketMap);
    try {
      ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        messageSwitch(parsedMessage, ws, userSocketMap);
      });
    } catch (err) {
      console.error(err);
    }
  });
});

afterAll(async () => {
  mongoose.disconnect();
  await mongod.stop;
});

describe("handleConnect", () => {
  test("Allow connection on valid user token and add to userSocketMap", async () => {
    expect(1).toBe(1);
  });
});

describe("messageSwitch routes", () => { });
