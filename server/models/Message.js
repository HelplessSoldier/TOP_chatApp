const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  postedBy: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  body: { type: String, required: true },
  dateAdded: { type: String },
});

messageSchema.pre("save", () => {
  this.dateAdded = Date.now();
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
