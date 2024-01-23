const v1Controller = require("../controllers/v1Controller");
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

app.get("/current-user", v1Controller.currentUser_get);
app.get("/user/:userid", v1Controller.user_get);
app.get("/chat/:chatid", v1Controller.chat_get);
app.delete("/chat/:chatid", v1Controller.chat_delete);
app.put("/user/friends/remove/:userid", v1Controller.user_friend_remove_put); // remove friend from both users
app.put("/user/invite/:chatid/:userid", v1Controller.user_invite_put); // add chatInvites object to user
app.put("/chat/kick/:chatid/:userid", v1Controller.chat_kick_user_put); // remove user from chat via moderation

let mongod;
const secret = process.env.secret; // using actual secret as it's also used in the controller

let chatToDeleteId;
let userToUnfriendId;
let userToKickId;
let testUser1id;
let testUser1Token; // this would normally be set as a cookie in v1AccountsController
let userToKickToken;
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

  const userToUnfriend = new User({
    email: "removeMe@gmail.com",
    username: "unfriendable",
    password: "test12",
    chats: [],
    ownedChats: [],
    chatInvites: [],
    friends: [testUser1._id],
    friendRequests: [],
    sentFriendRequests: [],
  });
  await userToUnfriend.save();
  userToUnfriendId = userToUnfriend._id;

  const userToKick = new User({
    email: "kickMe@gmail.com",
    username: "kickable",
    password: "test12",
    chats: [],
    ownedChats: [],
    chatInvites: [],
    friends: [testUser1._id],
    friendRequests: [],
    sentFriendRequests: [],
  });
  await userToKick.save();
  userToKickId = userToKick._id;

  const testChat1 = new Chat({
    name: "testChat1",
    owner: testUser1._id,
    participants: [testUser1._id],
    invitedUsers: [],
    instanceType: "public",
    messages: [],
  });
  await testChat1.save();

  testUser1.friends.push(userToUnfriend._id);
  testUser1.ownedChats.push(testChat1._id);
  testUser1.chats.push(testChat1._id);

  const chatToDelete = new Chat({
    name: "DeleteMe!",
    owner: testUser1._id,
    participants: [testUser1._id, userToKick._id],
    invitedUsers: [],
    instanceType: "public",
    messages: [],
  });
  await chatToDelete.save();

  testUser1.ownedChats.push(chatToDelete._id);
  testUser1.chats.push(chatToDelete._id);
  await testUser1.save();

  chatToDeleteId = chatToDelete._id;
  testUser1id = testUser1._id;
  testChat1id = testChat1._id;

  userToKick.chats.push(chatToDelete._id);
  await userToKick.save();

  testUser1Token = jwt.sign({ userId: testUser1id }, secret);
  userToKickToken = jwt.sign({ userId: userToKickId }, secret);
});

afterAll(async () => {
  mongoose.disconnect();
  await mongod.stop;
});

describe("v1Controller currentUser_get", () => {
  test("Gets current user if jwt exists", async () => {
    const response = await request(app)
      .get("/current-user")
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(response.body.message).toBe("Successfully retrieved user");
    expect(response.body.user._id.toString()).toBe(testUser1id.toString());
  });

  test("Returns 404 and user not found message on incorrect jwt payload", async () => {
    const incorrectJwt = jwt.sign({ userId: "someIdThatsNotInDb" }, secret);
    const response = await request(app)
      .get("/current-user")
      .set("Cookie", [`jwt=${incorrectJwt}`])
      .expect(404);

    expect(response.body.message.toString()).toBe("Error: User not found");
  });
});

describe("v1Controller user_get", () => {
  test("Gets user by a valid id without sending password", async () => {
    const response = await request(app).get(`/user/${testUser1id}`).expect(200);
    const userObject = response.body.user;
    expect(userObject.password).toBeUndefined();
    expect(userObject._id.toString()).toBe(testUser1id.toString());
  });

  test("Returns 404 and user not found message on invalid id", async () => {
    const response = await request(app).get(`/user/someinvalidid`).expect(404);
    expect(response.body.message.toString()).toBe("Error: User not found");
  });
});

describe("v1Controller chat_get", () => {
  test("Gets chat by a valid id", async () => {
    const response = await request(app).get(`/chat/${testChat1id}`).expect(200);
    const body = response.body;
    expect(body.message.toString()).toBe("Chat found");
    expect(body.chat._id.toString()).toBe(testChat1id.toString());
  });

  test("Returns 404 and not found message on invalid chat id", async () => {
    const response = await request(app).get("/chat/someinvalidid").expect(404);
    expect(response.body.message.toString()).toBe("Chat not found");
  });
});

describe("v1Controller chat_kick_user_put", () => {
  test("Doesn't remove user if req user isn't owner of chat", async () => {
    const response = await request(app)
      .put(`/chat/kick/${chatToDeleteId}/${testUser1id}`)
      .set("Cookie", [`jwt=${userToKickToken}`])
      .expect(403);

    expect(response.body.toString()).toBe(
      {
        message: "Cannot kick user",
        detail: "Requesting user is not the owner of this chat",
      }.toString()
    );

    const attemptedToRemoveChat = await Chat.findById(chatToDeleteId);
    const attemptedToRemoveUser = await User.findById(testUser1id);

    const userStillInChat = attemptedToRemoveUser.chats.includes(
      attemptedToRemoveChat._id
    );
    const chatStillInUser = attemptedToRemoveChat.participants.includes(
      attemptedToRemoveUser._id
    );

    expect(userStillInChat).toBe(true);
    expect(chatStillInUser).toBe(true);
  });

  test("Kicks user and returns 200 if valid", async () => {
    const response = await request(app)
      .put(`/chat/kick/${chatToDeleteId}/${userToKickId}`)
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(200);

    expect(response.body.message.toString()).toBe("Successfully kicked user");

    const kickedUser = await User.findById(userToKickId);
    const kickedFromChat = await Chat.findById(chatToDeleteId);

    const userInChat = kickedFromChat.participants.includes(kickedUser._id);
    const chatInUser = kickedUser.chats.includes(kickedFromChat._id);

    expect(userInChat).toBe(false);
    expect(chatInUser).toBe(false);
  });
});

describe("v1Controller user_invite_put", () => {
  // Order of tests matters for this one.
  // Keep it above chat_delete and user_friend_remove_put

  test("Invites user to chat if valid", async () => {
    const response = await request(app)
      .put(`/user/invite/${chatToDeleteId}/${userToUnfriendId}`)
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(200);

    expect(response.body.message.toString()).toBe("Invite sent");

    const friendRequestRecipiant = await User.findById(userToUnfriendId);
    const sentChat = await Chat.findById(chatToDeleteId);

    const inviteId = friendRequestRecipiant.chatInvites[0].chatid.toString();
    const chatId = sentChat._id.toString();
    const correctInvite = inviteId === chatId;

    expect(correctInvite).toBe(true);
  });
});

describe("v1Controller chat_delete", () => {
  test("Delete chat on valid request", async () => {
    const response = await request(app)
      .delete(`/chat/${chatToDeleteId}`)
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(200);

    expect(response.body.message.toString()).toBe("Successfully deleted chat");
    const deletedChat = await Chat.findById(chatToDeleteId);
    expect(deletedChat).toBe(undefined || null);
  });

  test("Returns 403 and cannot delete on invalid id (includes non owned chats)", async () => {
    const response = await request(app)
      .delete(`/chat/someinvalidid`)
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(403);
    const mess = response.body.message;
    expect(mess.toString()).toBe("Cannot delete");
  });
});

describe("v1Controller user_friend_remove_put", () => {
  test("Removes friend from both users", async () => {
    const response = await request(app)
      .put(`/user/friends/remove/${userToUnfriendId}`)
      .set("Cookie", [`jwt=${testUser1Token}`])
      .expect(200);

    expect(response.body.message.toString()).toBe(
      "Successfully removed friend"
    );

    const testUser1 = await User.findById(testUser1id);
    const userToUnfriend = await User.findById(userToUnfriendId);

    const u1IncludesU2 = testUser1.friends.includes(userToUnfriendId);
    const u2IncludesU1 = userToUnfriend.friends.includes(testUser1id);

    expect(u1IncludesU2).toBe(false);
    expect(u2IncludesU1).toBe(false);
  });
});
