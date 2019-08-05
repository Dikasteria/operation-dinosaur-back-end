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

  const maxPast = new Date(Date.now() - 5400000) //90 minutes
  const maxFuture  = new Date(Date.now() + 7200000) //120 minutes
  return connection
    .select('*')
    .from('meds')
    .where({ user_id })
    .orderBy('due', 'asc')
    .then(meds => {
      const filteredMeds = meds.filter(med => {
        if (med.due < maxPast || med.due > maxFuture ) return false;
        else return true;
      })

      if(filteredMeds.length > 0) {
        const id = filteredMeds[0].id;
        const taken = true;
        const taken_at = new Date(Date.now());
        const status = 10;
        return connection('meds')
        .where({ id })
        .update({ taken, taken_at, status })
        .returning('*')
        .then(([ patchedMed ]) => {
          const confirmation = true;
          const message = `your medication ${patchedMed.type} was successfully recorded as taken`
          return { patchedMed, confirmation, message };
        });
      } else {
        // no medication is due suitably soon - return failure
        const confirmation = false;
        const message = `your medication could not be recorded as taken`
        return { confirmation, message };
      };
    });

};