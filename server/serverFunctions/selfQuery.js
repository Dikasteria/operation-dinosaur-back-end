const { connection } = require('../connection');
const {
    assignMedTaken,
    assignPromptBefore,
    assignPromptAt,
    assignPromptLate,
    assignPromptVeryLate,
    assignWriteOff
} = require('./updateMeds');
 const {
    promptBefore,
    promptAt,
    promptLate,
    promptVeryLate,
    writeOff
} = require('./parameters')


selfQuery = async () => {
    const currentTime = new Date(Date.now());
    const untakenMeds =
        await connection
            .select('*')
            .from('meds')
            .whereNotIn('status', [ 5, 9, 10])
            .returning('*')

    testLog(untakenMeds, currentTime);

    untakenMeds.forEach(med => {
        const { id } = med;
        if(med.taken) assignMedTaken(id);
        else {
            //find remainingTime bracket
            const remainingTime = med.due - currentTime;
            const brackets = [writeOff, promptVeryLate, promptLate, promptAt, promptBefore].filter(bracket => remainingTime <= bracket);
            const bracket = (brackets.length > 0) ?  brackets[0] : null;

            //update accordingly
            if(bracket === promptBefore) assignPromptBefore(med);
            if(bracket === promptAt) assignPromptAt(med);
            if(bracket === promptLate) assignPromptLate(med);
            if(bracket === promptVeryLate) assignPromptVeryLate(med);
            if(bracket === writeOff) assignWriteOff(med);
            //else no reminder due, do nothing
        };
    });
};

testLog = (untakenMeds, currentTime) => {
    const remainingMeds = untakenMeds.map(med => {
        const { id, due, status } = med;
        const remainingTime = due - currentTime;
        return { id, remainingTime, status }
    });
    console.log(remainingMeds);
};

module.exports = { selfQuery };