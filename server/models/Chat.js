const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  invitedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  instanceType: {
    type: String,
    enum: ["public", "friends", "friendsPlus", "invite", "invitePlus"],
    required: true,
  },
  messages: [
    {
      sentByUsername: { type: String, required: true },
      sentById: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      messageBody: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
