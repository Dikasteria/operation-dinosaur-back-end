

//set frequency of server monitoring function
const recurTimeout = 3000

//set times at which to prompt user
const promptBefore = 10000;
const promptAt = 0;
const promptLate = -10000;
const promptVeryLate = -20000;
const writeOff = -30000;


module.exports = {
    recurTimeout,
    promptBefore,
    promptAt,
    promptLate,
    promptVeryLate,
    writeOff
};