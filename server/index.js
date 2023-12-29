const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const v1Router = require("./routes/v1Router");
const v1AccountsRouter = require("./routes/v1AccountsRouter");
const v1ChatRouter = require("./routes/v1ChatRouter");
const apiPublicGlobals = require("../publicGlobals/apiGlobals.json");
const connectToMongo = require("./helpers/connectToMongo");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

connectToMongo("mongodb://localhost:27017/chatApp", mongoose);

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(morgan("dev"));
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/v1", v1Router);
app.use("/v1/accounts", v1AccountsRouter);
app.use("/v1/chat", v1ChatRouter);

app.listen(apiPublicGlobals.serverPort || 3000, () =>
  console.log(
    `Server listening at: ${apiPublicGlobals.serverUri}:${apiPublicGlobals.serverPort}`
  )
);
