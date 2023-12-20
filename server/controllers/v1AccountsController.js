const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

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

    let foundUser = User.findOne({ username });
    if (foundUser) {
      val.errors.push({ param: "username", msg: "Username in use" });
    }

    foundUser = User.findOne({ email });
    if (foundUser) {
      val.errors.push({ param: "email", msg: "Email in use" });
    }

    if (val.errors.length > 0) {
      res.status(403);
      res.json({ message: "Validation errors", errors: val.errors });
    }

    const newUser = new User({
      email: email,
      username: username,
      password: password,
    });

    try {
      await newUser
        .save()
        .then(console.log("new user saved"))
        .then(res.json({ message: "Successfully added user" }));
    } catch (err) {
      res.status(500);
      res.json({
        message: "Internal server error when attempting to save new user",
      });
    }
  }),
];
