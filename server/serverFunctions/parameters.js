//set frequency of server monitoring function
const recurTimeout = 300000;

//set times at which to prompt user
const promptBefore = 900000;
const promptAt = 0;
const promptLate = -1800000;
const promptVeryLate = -3600000;
const writeOff = -5400000;

module.exports = {
  recurTimeout,
  promptBefore,
  promptAt,
  promptLate,
  promptVeryLate,
  writeOff
};
