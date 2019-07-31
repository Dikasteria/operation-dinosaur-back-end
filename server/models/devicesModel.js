const { connection } = require('../connection');

exports.getDevices = ({ user_id }) => {
  return connection
    .select('*')
    .from('devices')
    .where({ user_id });
};

exports.postDevice = ({ user_id, push_key }) => {
  const device = { user_id, push_key };
  return connection
    .insert(device)
    .into('devices')
    .returning('*')
    .then(([addedDevice]) => {
      return addedDevice;
    });
};
