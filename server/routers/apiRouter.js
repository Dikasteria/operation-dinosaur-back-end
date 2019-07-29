const express = require("express");
const apiRouter = express.Router();
const { usersRouter } = require("./usersRouter");

// apiRouter.route("/").all(errHandle405);
apiRouter.use("/users", usersRouter);

module.exports = { apiRouter };
