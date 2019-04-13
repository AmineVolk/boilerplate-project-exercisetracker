const { resolve } = require("path");

const { getUserById } = require(resolve("db/userDao"));
const logger = require("loggy");
const checkUserId = userId => {
  if (userId === undefined || userId === "") {
  } else {
    return "valid";
  }
};

module.exports.getLog = async (req, res) => {
  const { userId, from, to, limit } = req.query;
  const checkUserIdResult = checkUserId(userId);
  const userToSent = {};
  if (checkUserIdResult === "valid") {
    const user = await getUserById(userId);
    if (user != "User not found") {
      userToSent._id = user._id;
      userToSent.username = user.username;
      userToSent.count = user.log.length;
      userToSent.log = user.log;
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
