const express = require("express");
const v1ChatController = require("../controllers/v1ChatController");

const router = express.Router();

router.get("/chat", v1ChatController.connect_get);
router.post("/new-chat", v1ChatController.new_chat_post);

module.exports = router;
