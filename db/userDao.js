var mongoose = require("mongoose");
const { getDbConnection } = require("./connection");
const shortid = require("shortid");
const User = mongoose.model("User", { _id: String, username: String });
const logger = require("loggy");
const getUserByUserName = async username => {
  let result;
  await getDbConnection();
  await User.find({ username: username }, (err, data) => {
    if (err) {
      logger.warn(`************ error in getUserByUserName ${e}`);
      return "Error";
    } else {
      result = data;
    }
  });
  if (result.length == 0) {
    return "User not found";
  }

  return result[0];
};

const addUser = async username => {
  try {
    await getDbConnection();
    logger.log(`************ connected`);
    const userToAdd = { username: username, _id: shortid.generate() };
    const shortUrlToAdd = new User(userToAdd);
    await shortUrlToAdd.save();
    logger.log(`************ user saved,${JSON.stringify(userToAdd)}`);
    return userToAdd;
  } catch (e) {
    logger.log(`************ e ${e}`);
    return "Error";
  }
};
module.exports = { addUser, getUserByUserName };
