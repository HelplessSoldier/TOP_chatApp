async function connectToMongo(uri, mongoose) {
  try {
    await mongoose.connect(uri);
    console.log(`Connected to DB: ${uri}`); // this fires even when mongo isn't running
  } catch (err) {
    console.error(`Could not connect to DB: ${uri}`);
  }
}

module.exports = connectToMongo
