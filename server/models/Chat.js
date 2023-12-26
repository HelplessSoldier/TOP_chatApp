const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  instanceType: {
    type: String,
    enum: ["public", "friends", "friendsPlus", "invite", "invitePlus"],
    required: true,
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
