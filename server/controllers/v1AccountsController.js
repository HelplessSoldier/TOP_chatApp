const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

exports.log_in_post = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage('E-mail required')
    .isEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage('Password required')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const foundUser = await User.findOne({ email: email });
    const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
    console.log(`correct password: ${isCorrectPassword}`)
    next();
  })
]

exports.sign_up_post = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail required")
    .isEmail()
    .withMessage("Invalid E-mail")
    .escape(),

  body("username").trim().notEmpty().withMessage("Username required").escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters")
    .escape(),

  body("confirmPassword").notEmpty().withMessage("Confirm password required"),

  asyncHandler(async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const val = validationResult(req);
    if (confirmPassword !== password) {
      val.errors.push({
        param: "confirmPassword",
        msg: "Passwords do not match",
      });
    }

    let foundUser = await User.findOne({ username: username });
    if (foundUser) {
      val.errors.push({ param: "username", msg: "Username in use" });
    }

    foundUser = await User.findOne({ email: email });
    if (foundUser) {
      val.errors.push({ param: "email", msg: "Email in use" });
    }

    if (val.errors.length > 0) {
      res.status(403);
      res.json({ message: "Validation errors", errors: val.errors });
      return;
    }

    const newUser = new User({
      email: email,
      username: username,
      password: password,
    });

    try {
      await newUser.save()
      console.log('user saved')
      res.json({ message: "Succesfully saved user" })
    } catch (err) {
      res.status(500).json({
        message: "Internal server error when attempting to save new user",
      });
    }
  }),
];
