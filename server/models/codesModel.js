const { connection } = require('../connection');

exports.getCode = () => {
  //ensures 4 digit code does not begin with a 0 to avoid issues with Alexa
  const codeStr = Math.floor(Math.random() * 8999 + 1000).toString();

  return connection
    .select('*')
    .from('codes')
    .then(codesObjs => {
      const codes = codesObjs.map(codeObj => codeObj.code);
      if (!codes.includes(codeStr)) {
        return codeStr;
      } else {
        return getCode();
      }
    });
};

exports.addCode = (user_id, code) => {
  return connection
    .insert({ user_id, code })
    .into('codes')
    .returning('*');
};

exports.deleteCode = code_id => {
  return connection('codes')
    .where({ id: code_id })
    .delete();
};

exports.getAllCodes = () => {
  return connection.select('*').from('codes');
};

exports.checkCode = code => {
  return connection
    .select('*')
    .from('codes')
    .then(codesObjs => {
      const codes = codesObjs.map(codeObj => codeObj.code);
      if (codes.includes(code)) {
        return true;
      } else {
        return false;
      }
    });
};
