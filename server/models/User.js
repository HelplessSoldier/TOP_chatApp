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

userSchema.pre("save", (next) => {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(process.env.saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
