const express = require("express");
const v1Controller = require("../controllers/v1Controller");
const v1AccountsController = require("../controllers/v1AccountsController");

const router = express.Router();

router.get("/", v1Controller.root_get);
router.get('/current-user', v1Controller.currentUser_get);
router.get('/user/:userid', v1Controller.user_get);
router.get('/chat/:chatid', v1Controller.chat_get);
router.delete('/chat/:chatid', v1Controller.chat_delete);
router.put('/user/friends/remove/:userid', v1Controller.user_friend_remove_put); // remove friend from both users
router.put('/user/invite/:chatid/:userid', v1Controller.user_invite_put); // add chatInvites object to user

module.exports = router;
