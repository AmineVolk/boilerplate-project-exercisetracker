const { resolve } = require("path");
const { getUserById } = require(resolve("db/userDao"));
const logger = require("loggy");
const { filter } = require("./filter");
const checkUserId = userId => {
  if (userId === undefined || userId === "") {
  } else {
    return "valid";
  }
};

const getUserToSent = user => {
  const userToSent = {};
  userToSent._id = user._id;
  userToSent.username = user.username;
  userToSent.count = user.log.length;
  userToSent.log = user.log;
  return userToSent;
};
module.exports.getLog = async (req, res) => {
  const { userId } = req.query;
  const checkUserIdResult = checkUserId(userId);
  let userToSent = {};
  if (checkUserIdResult === "valid") {
    const user = await getUserById(userId);
    if (user != "User not found") {
      userToSent = filter(req, getUserToSent(user));
      logger.log(`***** userToSent ${JSON.stringify(userToSent)}`);
      res.status(200).send(userToSent);
    } else {
      res
        .status(400)
        .type("txt")
        .send("unknown userId");
    }
  } else {
    res
      .status(400)
      .type("txt")
      .send("unknown userId");
  }
};
