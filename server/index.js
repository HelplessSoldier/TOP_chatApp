const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const apiPublicGlobals = require("../publicGlobals/apiGlobals.json");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res, next) => {
  res.json({ message: "oh hi! this is the root route!" });
});

app.listen(apiPublicGlobals.serverPort, () =>
  console.log(
    `Server listening at: ${apiPublicGlobals.serverUri}:${apiPublicGlobals.serverPort}`
  )
);
