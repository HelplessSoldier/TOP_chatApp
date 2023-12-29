const asyncHandler = require('express-async-handler');
require('dotenv').config();

exports.root_get = (req, res, next) => {
  res.send('hi! this is the controller')
}

exports.user_get = (req, res, next) => {
  const cookies = req.cookies
  console.log(cookies);
  console.log('got into user_get')
  res.json({ message: 'sup' })
}
