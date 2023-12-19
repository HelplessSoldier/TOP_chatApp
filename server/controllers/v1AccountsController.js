const asyncHandler = require('express-async-handler');

exports.sign_up_post = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  console.log(`email: ${email}\nun: ${username}\npw: ${password}\ncpw: ${confirmPassword}`)

  res.send('hi')
})
