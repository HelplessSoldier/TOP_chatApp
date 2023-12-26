const express = require('express');
const router = express.Router();
const v1ChatController = require('../controllers/v1ChatController');

router.get('/connect', v1ChatController.connect_get);

module.exports = router;
