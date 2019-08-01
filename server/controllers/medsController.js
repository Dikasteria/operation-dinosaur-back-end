const { getMeds, postMed, patchMed, deleteMed } = require('../models/');

exports.fetchMeds = (req, res, next) => {
  getMeds({ ...req.params })
    .then(meds => {
      if (meds.length < 1) {
        res.status(404).send({ msg: 'No medications found' });
      } else {
        res.status(200).send({ meds });
      }
    })
    .catch(next);
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
