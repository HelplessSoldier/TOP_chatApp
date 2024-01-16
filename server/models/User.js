const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  ownedChats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  currentChat: { type: Schema.Types.ObjectId, ref: "Chat" },
  chatInvites: [
    {
      chatid: { type: Schema.Types.ObjectId, ref: "Chat" },
      chatName: { type: String },
      sentById: { type: Schema.Types.ObjectId, ref: "User" },
      sentByName: { type: String },
    },
  ],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  sentFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

userSchema.pre("save", async function(next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(Number(process.env.saltRounds));
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
