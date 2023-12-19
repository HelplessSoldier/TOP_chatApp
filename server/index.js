const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')
const v1Router = require("./routes/v1Router");
const v1AccountsRouter = require('./routes/v1AccountsRouter');
const apiPublicGlobals = require("../publicGlobals/apiGlobals.json");

const app = express();

connectToMongo('mongodb://localhost:27017')

app.use(morgan("dev"));
app.use(cors())
app.use('/v1', v1Router);
app.use('/v1/accounts', v1AccountsRouter);

app.listen(apiPublicGlobals.serverPort, () =>
  console.log(
    `Server listening at: ${apiPublicGlobals.serverUri}:${apiPublicGlobals.serverPort}`
  )
);

async function connectToMongo(uri) {
  try {
    mongoose.connect(uri)
    console.log(`Connected to DB: ${uri}`)
  } catch (err) {
    console.error(`Could not connect to DB: ${uri}`)
  }
}
