const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const v1Router = require("./routes/v1Router");
const v1AccountsRouter = require("./routes/v1AccountsRouter");
const apiPublicGlobals = require("../publicGlobals/apiGlobals.json");
const passport = require("passport");
const initializePassport = require("./helpers/passportConfig");
const flash = require("express-flash");
const session = require("express-session");
const connectToMongo = require('./helpers/connectToMongo');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

connectToMongo("mongodb://localhost:27017/chatApp", mongoose);
initializePassport(passport);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize())
app.use(passport.session())

app.use("/v1", v1Router);
app.use("/v1/accounts", v1AccountsRouter);

app.listen(apiPublicGlobals.serverPort || 3000, () =>
  console.log(
    `Server listening at: ${apiPublicGlobals.serverUri}:${apiPublicGlobals.serverPort}`
  )
);

