const { getUserById } = require("../db/userDao.js");
var check = require("check-types");
const checkFormValidity = exercise => {
  console.log(`exercse ${JSON.stringify(exercise)}`);
  if (exercise.description === "" || exercise.description === undefined) {
    return { isValid: false, message: "Path `description` is required." };
  } else if (exercise.duration === "" || exercise.duration === undefined) {
    return { isValid: false, message: "Path `duration` is required." };
  } else {
    const durationNumber = parseInt(exercise.duration, 10);
    if (!check.number(durationNumber)) {
      return {
        isValid: false,
        message: `Cast to Number failed for value "${
          exercise.duration
        }" at path "duration"`
      };
    } else {
      exercise.duration = durationNumber;
      return { isValid: true, exercise: exercise };
    }
  }
};

const checkDate = exercise => {
  if (exercise.date != "") {
    const dateAfterParsing = new Date(
      exercise.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    if (dateAfterParsing == "Invalid Date") {
      return { isValid: false };
    } else {
      exercise.date = dateAfterParsing;
      return { isValid: true, exercise: exercise };
    }
  } else {
    exercise.date = new Date();
    return { isValid: true, exercise: exercise };
  }
};

module.exports.addExercise = async (req, res) => {
  let exercise = req.body;
  const checkFormValidityResult = checkFormValidity(exercise);
  const user = await getUserById(exercise.userId);
  if (user != "User not found") {
    if (checkFormValidityResult.isValid) {
      exercise = checkFormValidityResult.exercise;
      const checkDateResult = checkDate(exercise);
      if (checkDateResult.isValid) {
        exercise = checkDateResult.exercise;
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
