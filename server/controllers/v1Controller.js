const asyncHandler = require('express-async-handler');

exports.root_get = (req, res, next) => {
  res.send('hi! this is the controller')
}

exports.user_get = (req, res, next) => {
  console.log('got into user_get')
  res.send('hi! this is the user_get controller')
}
