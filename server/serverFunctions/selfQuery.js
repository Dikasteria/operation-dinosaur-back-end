const { connection } = require('../connection');

exports.selfQuery = async () => {
    const untakenMeds =
        connection
            .select('*')
            .from('meds')
            .where({ taken: false })
    
    console.log(untakenMeds);
};