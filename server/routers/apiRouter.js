const express = require("express");
const apiRouter = express.Router();
const { usersRouter } = require("./usersRouter");
const { devicesRouter } = require("./devicesRouter");

// apiRouter.route("/").all(errHandle405);
apiRouter.use("/users", usersRouter);
apiRouter.use("/devices", devicesRouter);

module.exports = { apiRouter };
