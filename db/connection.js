require("dotenv").config();
var mongoose = require("mongoose");
let connection;
var uri = process.env.MONGOLAB_URI;
console.log(`uri ${uri}`);

module.exports.getDbConnection = () => {
  if (!connection) {
    connection = mongoose.connect(uri.toString(), { useNewUrlParser: true });
  }
  return connection;
};
