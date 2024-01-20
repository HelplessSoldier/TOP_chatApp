const v1AccountController = require("../controllers/v1AccountsController");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const User = require("../models/User");

const app = express();

app.use(express.json());

app.post("/signup", v1AccountController.sign_up_post);

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

describe("v1AccountController", () => {
  test("Valid request to sign_up_post adds the user to db", async () => {
    const testBody = {
      email: "test1@example.com",
      username: "testUser1",
      password: "test12",
      confirmPassword: "test12",
    };
    const response = await request(app)
      .post("/signup")
      .set("Content-Type", "application/json")
      .send(testBody);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Succesfully saved user");

    const userInDb = await User.findOne({ username: testBody.username });
    expect(userInDb).toBeTruthy();
    expect(userInDb.email).toBe(testBody.email);
    expect(userInDb.username).toBe(testBody.username);

    const passwordsMatch = userInDb.password === testBody.password;
    expect(passwordsMatch).toBe(false);
  });

  test("Invalid email requests don't add user", async () => {
    const testBody = {
      email: "invalidEmailString",
      username: "validTestName",
      password: "validpass",
      confirmPassword: "validpass",
    };
    const response = await request(app)
      .post("/signup")
      .set("Content-Type", 'application/json')
      .send(testBody);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Validation errors");

    const userInDb = await User.findOne({ username: 'validTestName' })
    expect(userInDb).toBe(null);
  });


  test("Invalid username requests don't add user", async () => {
    const testBody = {
      email: "valid@email.com",
      username: "",
      password: "validpass",
      confirmPassword: "validpass",
    };
    const response = await request(app)
      .post("/signup")
      .set("Content-Type", 'application/json')
      .send(testBody);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Validation errors");

    const userInDb = await User.findOne({ username: 'validTestName' })
    expect(userInDb).toBe(null);
  });

  test("Invalid password requests don't add user", async () => {
    const testBody = {
      email: "valid@email.com",
      username: "validUsername",
      password: "inval", // too short
      confirmPassword: "inval",
    };

    const response = await request(app)
      .post("/signup")
      .set("Content-Type", 'application/json')
      .send(testBody);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Validation errors");

    const userInDb = await User.findOne({ username: 'validUsername' })
    expect(userInDb).toBe(null);
  });

  test("Invalid confirm password requests don't add user", async () => {
    const testBody = {
      email: "valid@email.com",
      username: "validUsername_1",
      password: "validPassword",
      confirmPassword: "alidPassword",
    };

    const response = await request(app)
      .post("/signup")
      .set("Content-Type", 'application/json')
      .send(testBody);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Validation errors");

    const userInDb = await User.findOne({ username: 'validUsername_1' })
    expect(userInDb).toBe(null);
  });
});
