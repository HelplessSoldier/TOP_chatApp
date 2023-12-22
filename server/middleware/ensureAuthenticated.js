const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    return next();
  }
  res.json({ error: "Unauthorized" });
}

module.exports = ensureAuthenticated;
