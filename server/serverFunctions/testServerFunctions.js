const { selfQuery } = require('./index');


const { connection } = require('../connection');


///

const recurTimeout = 3000

///

function recurQuery() {
    selfQuery();
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>> running at', new Date(Date.now()));
    setTimeout(recurQuery, recurTimeout)
}


async function seedData(){
    const due3 = new Date(Date.now() + 18000);
    const due2 = new Date(Date.now() + 12000);
    const due1 = new Date(Date.now() + 8000);
    const newMeds = [
        {
            user_id: 1,
            due: due1,
            type: 'testmed'
        },
        {
            user_id: 1,
            due: due2,
            type: 'testmed'
        },
        {
            user_id: 1,
            due: due3,
            type: 'testmed'
        }
    ];
    return connection
        .insert(newMeds)
        .into('meds')
        .returning('*')
        .then(meds => {
            console.log(`added ${meds.length} test meds`)
            return meds.length;
        });
};
    

seedData().then(x => {

    recurQuery();
    
});