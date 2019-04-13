var mongoose = require("mongoose");
const { getDbConnection } = require("./connection");
const shortid = require("shortid");
const User = mongoose.model("User", {
  _id: String,
  username: String,
  log: Array
});
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

const getUserById = async id => {
  let result;
  await getDbConnection();
  await User.find({ _id: id }, (err, data) => {
    if (err) {
      logger.warn(`************ error in getUserById ${e}`);
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
    const userToAdd = { username: username, _id: shortid.generate(), log: [] };
    const shortUrlToAdd = new User(userToAdd);
    await shortUrlToAdd.save();
    logger.log(`************ user saved,${JSON.stringify(userToAdd)}`);
    return userToAdd;
  } catch (e) {
    logger.log(`************ e ${e}`);
    return "Error";
  }
};

const updateUser = async (_id, log) => {
  await User.updateOne({ _id: _id }, { log: log }, (err, user) => {
    if (err) {
      logger.warn(`Error when updateUser ${err}`);
    } else {
      logger.info(`user updated ${JSON.stringify(user)}`);
    }
  });
};
module.exports = { addUser, getUserByUserName, getUserById, updateUser };
