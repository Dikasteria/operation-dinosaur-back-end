const { selfQuery } = require('./selfQuery');
const { connection } = require('../connection');
const { recurTimeout } = require('./parameters');

async function seedData(){
    const due1 = new Date(Date.now() + 8000);
    const due2 = new Date(Date.now() + 12000);
    const due3 = new Date(Date.now() + 18000);
    const due4 = new Date(Date.now() + 22000);
    const newMeds = [
        {
            user_id: 1,
            due: due1,
            type: 'testmed1'
        },
        {
            user_id: 1,
            due: due2,
            type: 'testmedoline'
        },
        {
            user_id: 1,
            due: due3,
            type: 'testmedanol'
        },
        {
            user_id: 1,
            due: due4,
            type: 'testmedicil'
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

seedData();