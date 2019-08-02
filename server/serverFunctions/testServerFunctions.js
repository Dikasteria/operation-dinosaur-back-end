const { selfQuery } = require('./index');


const { connection } = require('../connection');
const now = new Date(Date.now());



!function recurQuery() {
    selfQuery();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> running at', new Date(Date.now()));
    setTimeout(recurQuery, 1500)
}();



// selfQuery();
// setTimeout(selfQuery, 1500);
// console.log('<<<<<<<<<<<<<<<<testing');


// function myFunc() {
//     console.log('func invoked');
// }
// myFunc();
// setTimeout(myFunc, 1500);
// console.log('testing');