const v1Controller = require('../controllers/v1Controller');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Chat = require('../models/Chat');
const request = require("supertest");
const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/current-user', v1Controller.currentUser_get);
app.get('/user/:userid', v1Controller.user_get);
app.get('/chat/:chatid', v1Controller.chat_get);
app.delete('/chat/:chatid', v1Controller.chat_delete);
app.put('/user/friends/remove/:userid', v1Controller.user_friend_remove_put); // remove friend from both users
app.put('/user/invite/:chatid/:userid', v1Controller.user_invite_put); // add chatInvites object to user
app.put('/chat/kick/:chatid/:userid', v1Controller.chat_kick_user_put); // remove user from chat via moderation

let mongod;
let uri;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  uri = mongod.getUri();
  mongoose.connect(uri);
});

afterAll(async () => {
  mongoose.disconnect();
  await mongod.stop;
});

