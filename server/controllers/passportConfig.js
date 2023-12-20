const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const foundUser = await User.findOne({ email: email });
    const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
    if (!foundUser || !isCorrectPassword) {
      return done(null, false, { message: 'Incorrect email or password' })
    }

    return done(null, foundUser);
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id);
  done(null, foundUser);
})

module.exports = passport;
