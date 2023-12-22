const express = require("express");
const v1AccountsController = require("../controllers/v1AccountsController");
const router = express.Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");

router.post("/signup", v1AccountsController.sign_up_post);
router.post("/login", v1AccountsController.log_in_post);
router.post("/logout", v1AccountsController.log_out_post);

module.exports = router;
