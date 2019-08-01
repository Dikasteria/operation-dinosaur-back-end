const { formatCode } = require('../../utils/formatData');
const { connection } = require('../connection');

exports.getCode = () => {
  const codeStr = Math.floor(Math.random() * 9999).toString();
  const formattedCode = formatCode(codeStr);

  return connection
    .select('*')
    .from('codes')
    .then(codesObjs => {
      const codes = codesObjs.map(codeObj => codeObj.code);
      if (!codes.includes(formattedCode)) {
        return formattedCode;
      } else {
        return getCode();
      }
    });
};

exports.addCode = code => {
  return connection
    .insert({ code })
    .into('codes')
    .returning('*');
};

exports.deleteCode = code => {
  return connection('codes')
    .where({ code })
    .delete();
};
