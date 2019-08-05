const { connection } = require('../connection');

exports.getMeds = ({ user_id }) => {
  return connection
    .select('*')
    .from('meds')
    .where({ user_id });
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

exports.patchMedTakenApp = ({ user_id }) => {
  //check db for untaken meds belonging to user
  //find one not more than 90 mins overdue; not more than 3 hours early

  
  // return connection('meds')
  //   .where({ user_id })

}