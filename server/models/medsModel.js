const { connection } = require('../connection');

exports.getAllMeds = ({ user_id }) => {
  return connection
    .select('*')
    .from('users')
    .where({ id: user_id })
    .returning('*')
    .then(users => {
      if(users.length === 1){
        return connection
          .select('*')
          .from('meds')
          .where({ user_id })
      }
        else if (users.length === 0){
          return Promise.reject({status: 404, msg: 'No such user'});
      };
    });
};

exports.getDailyMeds = ({ user_id }) => {
  return connection
  .select('*')
  .from('users')
  .where({ id: user_id })
  .returning('*')
  .then(users => {
    if(users.length === 1){
      return connection
        .select('*')
        .from('meds')
        .where({ user_id })
        .then(meds => {
          const now = new Date(Date.now());
          const plus24 = new Date(Date.now() + 86400000)
          const filteredMeds =  meds.filter(med => {
            if(med.due < now || med.due > plus24) return false;
            else return true;
          });
          return(filteredMeds);
        });
    }
      else if (users.length === 0){
        return Promise.reject({status: 404, msg: 'No such user'});
    };
  });
};

exports.getMedsAlexa = ({ amazon_id }) => {
  //convert amazon_id to user_id
  return connection
    .select('*')
    .from('devices')
    .where({ amazon_id })
    .returning('*')
    .then(([user]) => {
      
      const { user_id } = user;
      return connection
        .select('*')
        .from('meds')
        .where({ user_id })
        .returning('*')
        .then(meds => {
          const now = new Date(Date.now());
          const plus24 = new Date(Date.now() + 86400000)
          const filteredMeds =  meds.filter(med => {
            if(med.due < now || med.due > plus24) return false;
            else return true;
          });
          return(filteredMeds);
        });
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

exports.patchMedTakenAlexa = ({ amazon_id }) => {

  //convert amazon_id to user_id
  return connection
  .select('*')
  .from('devices')
  .where({ amazon_id })
  .returning('*')
  .then(([user]) => {

    const { user_id } = user;
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

  });
};