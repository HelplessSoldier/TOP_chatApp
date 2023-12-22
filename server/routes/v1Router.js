const express = require("express");
const v1Controller = require("../controllers/v1Controller");
const v1AccountsController = require("../controllers/v1AccountsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const router = express.Router();

router.get("/", v1Controller.root_get);
router.get("/protectedRoute", ensureAuthenticated, (req, res, next) => {
  console.log('got into protectedRoute')
  res.setHeader('Content-Type', 'application/json')
  res.json({ message: "got into protectedRoute!" });
});

module.exports = router;
