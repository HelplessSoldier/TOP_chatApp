const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
require("dotenv").config();

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
});

userSchema.pre("save", async function(next) {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.saltRounds));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
