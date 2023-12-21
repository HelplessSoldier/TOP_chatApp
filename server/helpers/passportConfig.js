const localStrategy = require("passport-local").Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

function initializePassport(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }

    try {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' })
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new localStrategy({ usernameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => { });
  passport.deserializeUser((id, done) => { });
}

module.exports = initializePassport;
