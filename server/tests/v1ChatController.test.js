const v1ChatController = require('../controllers/v1ChatController');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Chat = require("../models/Chat");
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/new-chat", v1ChatController.new_chat_post);

let mongod;
const secret = process.env.secret; // using actual secret as it's also used in the controller
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri);
});

afterAll(async () => {
  mongoose.disconnect();
  await mongod.stop;
});

describe("v1ChatController new_chat_post", () => {
  test("Can add a chat if valid", async () => {
    expect(1).toBe(1);
  })
})
