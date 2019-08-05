const formatDate = (list, key) => {
  return list.map(({ ...args }) => {
    const newObject = { ...args };
    if (newObject[key]) {
      const formattedDate = new Date(newObject[key]);
      newObject[key] = formattedDate;
    }
    return newObject;
  });
};

const testData = '019-07-29T15:00:00.000Z'
const add24Hours = (time) => {
  return false
}

module.exports = {
  formatDate,
  add24Hours
}