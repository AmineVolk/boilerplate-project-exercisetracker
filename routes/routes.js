var express = require("express");
var router = express.Router();
let { resolve } = require("path");
const { createUser } = require("./createUser");
const { addExercise } = require("./addExercise");

router.get("/", (req, res) => {
  res.sendFile(resolve("views/index.html"));
});

router.post("/api/exercise/new-user", (req, res) => createUser(req, res));
router.post("/api/exercise/add", (req, res) => addExercise(req, res));

module.exports = router;
