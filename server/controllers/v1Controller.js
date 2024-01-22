const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Chat = require("../models/Chat");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.root_get = (req, res) => {
  res.send("hi! this is the v1Controller");
};

exports.currentUser_get = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const tokenPayload = jwt.verify(token, process.env.secret);
    const userId = tokenPayload.userId;

    let currentUser;
    try {
      currentUser = await User.findById(userId);
    } catch (err) {
      res.status(404).json({ message: "Error: User not found" });
      return;
    }

    const userObject = currentUser.toObject();
    delete userObject.password;

    res
      .status(200)
      .json({ message: "Successfully retrieved user", user: userObject });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong in currentUser_get",
      detail: err,
    });
  }
});

exports.user_get = asyncHandler(async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.userid);

    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userObject = foundUser.toObject();
    delete userObject.password;
    res.status(200).json({ message: "User found", user: userObject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong in user_get", detail: err });
  }
});

exports.chat_get = asyncHandler(async (req, res) => {
  try {
    const foundChat = await Chat.findById(req.params.chatid);

    if (!foundChat) {
      res.status(404).json({ message: "Chat not found" });
      return;
    }

    const chatObject = foundChat.toObject();
    res.status(200).json({ message: "Chat found", chat: chatObject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong in chat_get", detail: err });
  }
});

exports.chat_delete = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const userId = jwt.verify(token, process.env.secret).userId;

    const requestingUser = await User.findById(userId);
    const chatToDeleteId = req.params.chatid;
    const chatOwnedByUser = requestingUser.ownedChats.includes(chatToDeleteId);

    if (!chatOwnedByUser) {
      res
        .status(403)
        .json({ message: "Cannot delete", detail: "User does not own chat" });
      return;
    }

    const chatToDelete = await Chat.findById(chatToDeleteId);
    if (!chatToDelete) {
      res
        .status(500)
        .json({ message: "Cannot delete", detail: "Chat was not found" });
    }

    await chatToDelete.deleteOne();
    const checkChat = await Chat.findById(chatToDeleteId);
    if (checkChat) {
      res
        .status(500)
        .json({ message: "Cannot delete", detail: "Failed to delete chat" });
    } else {
      res.status(200).json({ message: "Successfully deleted chat" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong in chat_delete", detail: err });
  }
});

exports.user_friend_remove_put = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.jwt;

    const userId = jwt.verify(token, process.env.secret).userId;
    const userToRemoveId = req.params.userid;

    const currentUser = await User.findById(userId);
    const userToRemove = await User.findById(userToRemoveId);

    currentUser.friends = currentUser.friends.filter(
      (_id) => _id.toString() !== userToRemove._id.toString()
    );

    userToRemove.friends = userToRemove.friends.filter(
      (_id) => _id.toString() !== currentUser._id.toString()
    );

    await Promise.all([userToRemove.save(), currentUser.save()]);

    res.status(200).json({ message: "Successfully removed friend" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove friend", error: err });
  }
});

exports.user_invite_put = asyncHandler(async (req, res) => {
  try {
    const chatId = req.params.chatid;
    const userId = req.params.userid;
    const reqUserId = jwt.verify(req.cookies.jwt, process.env.secret).userId;

    const chat = await Chat.findById(chatId);
    const user = await User.findById(userId);
    const requestingUser = await User.findById(reqUserId);

    if (
      user.chatInvites.some(
        (invite) => invite.chatid.toString() === chat._id.toString()
      )
    ) {
      res.status(409).json({
        message: "Failed to send invite",
        detail: "User already invited",
      });
      return;
    }

    if (!chat || !user || !requestingUser) {
      res.status(500).json({
        message: "Failed to send invite",
        detail: "Could not find documents",
      });
      return;
    }

    const inviteObject = {
      chatid: chat._id,
      chatName: chat.name,
      sentById: requestingUser._id,
      sentByName: requestingUser.username,
    };
    user.chatInvites.push(inviteObject);

    await user.save();

    res.json({ message: "Invite sent" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to add chat invite to user", error: err });
  }
});

exports.chat_kick_user_put = asyncHandler(async (req, res) => {
  try {
    const chatId = req.params.chatid;
    const userId = req.params.userid;
    const reqUserId = jwt.verify(req.cookies.jwt, process.env.secret).userId;

    const userToKick = await User.findById(userId);
    const requestingUser = await User.findById(reqUserId);
    const chat = await Chat.findById(chatId);

    const isOwner = chat.owner.toString() === requestingUser._id.toString();
    if (!isOwner) {
      res.status(403).json({
        message: "Cannot kick user",
        detail: "Requesting user is not the owner of this chat",
      });
      return;
    }

    chat.participants = chat.participants.filter(
      (_id) => _id.toString() !== userToKick._id.toString()
    );

    userToKick.chats = userToKick.chats.filter(
      (_id) => _id.toString() !== chat._id.toString()
    );

    await Promise.all([userToKick.save(), chat.save()]);

    res.status(200).json({ message: "Successfully kicked user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to kick user" });
  }
});
