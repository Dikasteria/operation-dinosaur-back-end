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
