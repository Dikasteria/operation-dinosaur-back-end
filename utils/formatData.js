exports.formatDate = (list, key) => {
  return list.map(({ ...args }) => {
    const newObject = { ...args };
    if (newObject[key]) {
      const formattedDate = new Date(newObject[key]);
      newObject[key] = formattedDate;
    }
    return newObject;
  });
};

exports.formatCode = code => {
  while (code.length < 4) {
    code = '0' + code;
  }
  return code;
};
