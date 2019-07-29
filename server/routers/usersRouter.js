const express = require("express");
const usersRouter = express.Router();
const { addUser } = require("../controllers/");

usersRouter.route("/").post(addUser);
// .all(console.log("err"));

module.exports = { usersRouter };
