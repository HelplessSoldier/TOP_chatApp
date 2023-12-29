const asyncHandler = require('express-async-handler');
require('dotenv').config();

exports.root_get = (req, res, next) => {
  res.send('hi! this is the controller')
}

exports.user_get = (req, res, next) => {
  const cookies = req.cookies
  res.json({ message: 'sup' })
}
