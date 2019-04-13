const { resolve } = require("path");
const { getUserById, updateUser } = require(resolve("db/userDao"));
const { checkDate, checkFormValidity } = require("./validation");
const logger = require("loggy");

module.exports.addExercise = async (req, res) => {
  let exercise = req.body;
  const checkFormValidityResult = checkFormValidity(exercise);
  const userId = exercise.userId;
  const user = await getUserById(userId);
  if (user != "User not found") {
    if (checkFormValidityResult.isValid) {
      exercise = checkFormValidityResult.exercise;
      const checkDateResult = checkDate(exercise);
      if (checkDateResult.isValid) {
        exercise = checkDateResult.exercise;
        delete exercise.userId;
        const logBeforUpdating = user.log;
        logBeforUpdating.push(exercise);
        logger.log(`logBeforUpdating ${JSON.stringify(logBeforUpdating)}`);

        await updateUser(userId, logBeforUpdating);
        exercise._id = userId;
        exercise.username = user.username;
        res.status(200).send(exercise);
      } else {
        res
          .status(400)
          .type("txt")
          .send(
            `Cast to Date failed for value "${exercise.date}" at path "date"`
          );
      }
    } else {
      res.status(400).send(checkFormValidityResult.message);
    }
  } else {
    res
      .status(400)
      .type("txt")
      .send("unknown _id");
  }
};
