const express = require('express');
const router = express.Router();
const v1Controller = require('../controllers/v1Controller');

router.get('/', v1Controller.root_get);
