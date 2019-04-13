const { resolve } = require("path");
const { addUser, getUserByUserName } = require(resolve("db/userDao"));
module.exports.createUser = async (req, res) => {
  const username = req.body.username;
  if (username != "") {
    const user = await getUserByUserName(username);
    if (user === "User not found") {
      let addUserResult = await addUser(username);
      if (addUserResult != "Error") {
        res.status(200).json(addUserResult);
      } else {
        res.status(500).json({ message: "Error to add user" });
      }
    } else {
      res.send("username already taken");
    }
  } else {
    res.send("Path `username` is required.");
  }
};
