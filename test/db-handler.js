const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

const connect = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose
    .createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
};

const closeDatabase = async () => {
    await mongo.stop();
};

module.exports = {
  connect,
  closeDatabase,
};
