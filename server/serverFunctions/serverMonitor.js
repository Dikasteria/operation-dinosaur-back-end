const { selfQuery } = require('./selfQuery');
const { recurTimeout } = require('./parameters');

function recurQuery() {
    selfQuery();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> running at', new Date(Date.now()));
    setTimeout(recurQuery, recurTimeout)
};


recurQuery();


module.exports = { recurQuery, recurTimeout }