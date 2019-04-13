var check = require("check-types");

const checkNotNulNotUndefinedNotEmpty = attirbute => {
  console.log(`******************** attribute ${attirbute}`);

  if (attirbute != "" && attirbute != undefined && attirbute.length > 0) {
    return true;
  } else {
    return false;
  }
};
const filterByLimite = (user, limit) => {
  if (limit <= user.log.length) {
    user.count = limit;
    user.log = user.log.slice(0, limit);
  }

  return user;
};

const filter = (req, user) => {
  const { from, to, limit } = req.query;
  if (
    checkNotNulNotUndefinedNotEmpty(from) &&
    checkNotNulNotUndefinedNotEmpty(to)
  ) {
  } else if (checkNotNulNotUndefinedNotEmpty(to)) {
  } else if (checkNotNulNotUndefinedNotEmpty(from)) {
  }
  if (checkNotNulNotUndefinedNotEmpty(limit) === true) {
    const limitAfterParsing = parseInt(limit, 10);
    if (check.number(limitAfterParsing)) {
      user = filterByLimite(user, limitAfterParsing);
    }
  }
  return user;
};

module.exports = { filterByLimite, filter };
