var check = require("check-types");
const logger = require("loggy");
var dateFormat = require("dateformat");
const checkFormValidity = exercise => {
  logger.log(`exercse ${JSON.stringify(exercise)}`);
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

const checkDate = date => {
  if (date != "") {
    const dateAfterParsing = new Date(
      date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    if (dateAfterParsing == "Invalid Date") {
      return { isValid: false };
    } else {
      let dateAfterFormating = new Date(dateAfterParsing);
      dateAfterFormating = dateFormat(now, "yyyy-mm-dd");
      logger.log(`********** dateAfterFormating ${dateAfterFormating}`);

      return { isValid: true, date: dateAfterFormating };
    }
  } else {
    var now = new Date();
    now = dateFormat(now, "yyyy-mm-dd");
    return { isValid: true, date: now };
  }
};
module.exports = { checkFormValidity, checkDate };
