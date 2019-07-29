const { connection } = require("../connection");

exports.getDevices = ({ user_id }) => {
  return connection("devices")
    .where({ user_id })
    .returning("*")
    .then(returnedDevices => {
      if (returnedDevices.length < 1)
        return Promise.reject({ status: 404, msg: "No devices found" });
      else return returnedDevices;
    });
};
