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

exports.postDevice = ({ user_id, push_key }) => {
  const device = { user_id, push_key };
  return connection
    .insert(device)
    .into("devices")
    .returning("*")
    .then(([addedDevice]) => {
      return addedDevice;
    });
};
