const { selfQuery } = require('./selfQuery');
const { recurTimeout } = require('./parameters');
const { seedData } = require('./seedTestData')

function recurQuery() {
    selfQuery();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> running at', new Date(Date.now()));
    setTimeout(recurQuery, recurTimeout)
};

    
seedData()
    .then(x => {

    recurQuery();
    
});