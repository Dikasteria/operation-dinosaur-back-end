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

exports.checkPair = (amazon_id) => {
  return connection('devices')
    .select('*')
    .where({amazon_id})
    .then(( devices )=> {
      if (!devices.length) {
        return { confirmation: false}
      } else {
        return { confirmation: true}
      }
    })
}
