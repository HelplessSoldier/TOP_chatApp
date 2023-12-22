async function connectToMongo(uri, mongoose) {
  try {
    mongoose.connect(uri);
    console.log(`Connected to DB: ${uri}`);
  } catch (err) {
    console.error(`Could not connect to DB: ${uri}`);
  }
}

module.exports = connectToMongo
