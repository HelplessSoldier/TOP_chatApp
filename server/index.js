const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const v1Router = require("./routes/v1Router");
const apiPublicGlobals = require("../publicGlobals/apiGlobals.json");

const app = express();

app.use(morgan("dev"));
app.use(v1Router);

app.listen(apiPublicGlobals.serverPort, () =>
  console.log(
    `Server listening at: ${apiPublicGlobals.serverUri}:${apiPublicGlobals.serverPort}`
  )
);
