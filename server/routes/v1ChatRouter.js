const express = require('express');
const v1ChatController = require('../controllers/v1ChatController');

const router = express.Router();

router.get('/chat', v1ChatController.connect_get)

module.exports = router;
