const express = require("express");
const v1Controller = require("../controllers/v1Controller");
const v1AccountsController = require("../controllers/v1AccountsController");

const router = express.Router();

router.get("/", v1Controller.root_get);
router.get('/current-user', v1Controller.currentUser_get);

module.exports = router;
