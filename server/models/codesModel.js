const { formatCode } = require('../../utils/formatData');

exports.getCode = () => {
  const code = Math.floor(Math.random() * 9999).toString();
  const formattedCode = formatCode(code);
  return formattedCode;
};
