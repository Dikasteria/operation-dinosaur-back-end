const { connection } = require('../connection');

exports.getDevices = ({ user_id }) => {
  return connection
    .select('*')
    .from('devices')
    .where({ user_id });
};

exports.postDevice = ({ user_id, push_key, amazon_id }) => {
  const device = { user_id, push_key, amazon_id };

  return connection
    .insert(device)
    .into('devices')
    .returning('*')
    .then(([addedDevice]) => {
      return addedDevice;
    });
};
