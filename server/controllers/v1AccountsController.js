const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.sign_up_post = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail required")
    .isEmail()
    .withMessage("Invalid E-mail")
    .escape(),

  body("username")
    .trim()
    .notEmpty()
    .withMessage('Username required')
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 6 characters")
    .escape(),

  body("confirmPassword").notEmpty().withMessage("Confirm password required"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const confirmPassword = req.body.confirmPassword.value;
    const password = req.body.password.value;
    if (confirmPassword !== password) {
      errors.push({ param: "confirmPassword", msg: "Passwords do not match" })
    }

    if (errors.length > 0) {
      res.status(403)
      res.json({ message: 'Validation errors', errors })
    }

  })
];
