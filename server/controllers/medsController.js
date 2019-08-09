const {
  getAllMeds,
  getDailyMeds,
  getMedsAlexa,
  postMed,
  patchMed,
  deleteMed,
  patchMedTakenApp,
  patchMedTakenAlexa
} = require('../models/');

exports.fetchAllMedsApp = (req, res, next) => {
  getAllMeds({ ...req.params })
    .then(meds => {
      res.status(200).send({ meds });
    })
    .catch(next);
};

exports.fetchDailyMedsApp = (req, res, next) => {
  getDailyMeds({ ...req.params })
    .then(meds => {
      res.status(200).send({ meds });
    })
    .catch(next);
};

exports.fetchMedsAlexa = (req, res, next) => {
    if(req.headers && req.headers.amazonid){
      const amazon_id = req.headers.amazonid;
      getMedsAlexa({ amazon_id })
        .then(meds => {
          res.status(200).send({ meds });
        })
        .catch(next);
    };
};

exports.addMed = (req, res, next) => {
  postMed({ ...req.params, ...req.body })
    .then(med => {
      res.status(201).send({ med });
    })
    .catch(next);
};

exports.updateMed = (req, res, next) => {
  patchMed({ ...req.params, ...req.body })
    .then(patchedMed => {
      res.status(200).send({ patchedMed });
    })
    .catch(next);
};

exports.removeMed = (req, res, next) => {
  deleteMed({ ...req.params })
    .then(() => {
      res.status(204).send({});
    })
    .catch(next);
};

exports.takenMedsApp = (req, res, next) => {
  patchMedTakenApp({ ...req.params })
    .then(result => {
      if(result.confirmation) res.status(201).send({ ...result });
      else res.status(400).send({ ... result });
    })
    .catch(err => console.log(err));
};

exports.takenMedsAlexa = (req, res, next) => {
  if(req.headers && req.headers.amazonid){
    const amazon_id = req.headers.amazonid;
    patchMedTakenAlexa({ amazon_id })
      .then(result => {
        if(result.confirmation) res.status(201).send({ ...result });
        else res.status(400).send({ ... result });
      })
      .catch(next);
  };
};
