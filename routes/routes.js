var express = require("express");
var router = express.Router();
let { resolve } = require("path");
const { createUser } = require("./createUser");
const { addExercise } = require("./addExercise/addExercise");
const { getLog } = require("./getLog");

router.get("/", (req, res) => {
  res.sendFile(resolve("views/index.html"));
});

router.post("/api/exercise/new-user", (req, res) => createUser(req, res));
router.post("/api/exercise/add", (req, res) => addExercise(req, res));
router.get("/api/exercise/log", (req, res) => getLog(req, res));

module.exports = router;
