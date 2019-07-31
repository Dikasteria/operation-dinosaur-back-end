const { connection } = require('../connection');

exports.getMeds = ({ user_id }) => {
  return connection('meds')
    .where({ user_id })
    .returning('*')
    .then(returnedMeds => {
      if (returnedMeds.length < 1)
        return Promise.reject({ status: 404, msg: 'No medications found' });
      else return returnedMeds;
    });
};

exports.postMed = ({ user_id, type, due }) => {
  const med = { user_id, type, due };
  return connection
    .insert(med)
    .into('meds')
    .returning('*')
    .then(([addedMed]) => {
      return addedMed;
    });
};

exports.patchMed = ({ med_id, taken }) => {
  const taken_at = new Date(Date.now());
  return connection('meds')
    .where({ id: med_id })
    .update({ taken, taken_at })
    .returning('*')
    .then(([patchedMed]) => {
      return patchedMed;
    });
};

exports.deleteMed = ({ med_id }) => {
  return connection('meds')
    .where({ id: med_id })
    .delete();
};
