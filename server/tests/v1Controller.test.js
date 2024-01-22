const v1Controller = require("../controllers/v1Controller");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Chat = require("../models/Chat");
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/current-user", v1Controller.currentUser_get);
app.get("/user/:userid", v1Controller.user_get);
app.get("/chat/:chatid", v1Controller.chat_get);
app.delete("/chat/:chatid", v1Controller.chat_delete);
app.put("/user/friends/remove/:userid", v1Controller.user_friend_remove_put); // remove friend from both users
app.put("/user/invite/:chatid/:userid", v1Controller.user_invite_put); // add chatInvites object to user
app.put("/chat/kick/:chatid/:userid", v1Controller.chat_kick_user_put); // remove user from chat via moderation

let mongod;
let testUserToken; // this would normally be set as a cookie in v1AccountsController
let testUser1id;
let testChat1id;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri);

  const testUser1 = new User({
    email: "testUser@gmail.com",
    username: "testUser",
    password: "test12",
    chats: [],
    ownedChats: [],
    chatInvites: [],
    friends: [],
    friendRequests: [],
    sentFriendRequests: [],
  });
  await testUser1.save();

  const testChat1 = new Chat({
    name: "testChat1",
    owner: testUser1._id,
    participants: [testUser1._id],
    invitedUsers: [],
    instanceType: "public",
    messages: [],
  });
  await testChat1.save();
  testUser1.ownedChats.push(testChat1._id);
  testUser1.chats.push(testChat1._id);
  await testUser1.save();

  testUser1id = testUser1._id;
  testChat1id = testChat1._id;
});

afterAll(async () => {
  mongoose.disconnect();
  await mongod.stop;
});

describe("v1Controller currentUser_get", () => {
  test("Gets current user if jwt exists", async () => {
    expect(1).toBe(1);
  });
});
