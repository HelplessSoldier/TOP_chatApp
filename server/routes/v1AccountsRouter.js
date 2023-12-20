const express = require('express');
const v1AccountsController = require('../controllers/v1AccountsController');
const router = express.Router();

router.post('/signup', v1AccountsController.sign_up_post);
router.post('/login', v1AccountsController.log_in_post);

module.exports = router;
