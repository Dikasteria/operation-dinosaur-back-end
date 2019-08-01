exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

// handle psql 400 errors
exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = ['22P02', '23502', '23503', '42703'];
  if (psqlCodes.includes(err.code)) {
    res.status(400).send({ msg: err.msg || 'bad request' });
  } else if (err.code === '22003') {
    res.status(422).send({ msg: err.msg || 'unprocessable entity' });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
