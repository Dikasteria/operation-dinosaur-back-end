const { getMeds, postMed, patchMed, deleteMed } = require('../models/');

exports.fetchMeds = (req, res, next) => {
  getMeds({ ...req.params }).then(meds => {
    res.status(200).send({ meds });
  });
};

exports.addMed = (req, res, next) => {
  postMed({ ...req.params, ...req.body }).then(med => {
    res.status(201).send({ med });
  });
};

exports.updateMed = (req, res, next) => {
  patchMed({ ...req.params, ...req.body }).then(patchedMed => {
    res.status(200).send({ patchedMed });
  });
};

exports.removeMed = (req, res, next) => {
  deleteMed({ ...req.params }).then(() => {
    res.status(204).send({});
  });
};
