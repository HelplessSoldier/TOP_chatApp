const asyncHandler = require('express-async-handler');

exports.sign_up_post = asyncHandler(async (req, res) => {
  console.log(`signup attempted req: ${req}`)
  res.send('hi')
})
