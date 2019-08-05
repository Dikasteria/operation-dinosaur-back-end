const moment = require('moment')

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

const add24Hours = (time) => {
  if (!time || time.length === 0){
    return false
  }
  const momentTime = moment(time).add(1, 'days').utc().format()
  // add in milliseconds
  return momentTime.replace(/:00Z/, ':00.000Z')
}

module.exports = {
  formatDate,
  add24Hours
}