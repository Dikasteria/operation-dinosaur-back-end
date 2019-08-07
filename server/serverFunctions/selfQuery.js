const { connection } = require('../connection');
const {
    assignMedTaken,
    assignPromptBefore,
    assignPromptAt,
    assignPromptLate,
    assignPromptVeryLate,
    assignWriteOff,
    assignDiscontinued
} = require('./updateMeds');

selfQuery = async () => {

    const untakenMeds =
        await connection
            .select('*')
            .from('meds')
            .whereNotIn('status', [ 5, 9, 10])
            .returning('*')

    const currentTime = new Date(Date.now());
    const remainingMeds = untakenMeds.map(med => {
        const { id, due } = med;
        const remainingTime = due - currentTime;
        return { id, remainingTime }
    });
    console.log(remainingMeds);

    //set times at which to prompt user
    const promptBefore = 10000;
    const promptAt = 0;
    const promptAfterFirst = -10000;
    const promptAfterSecond = -20000;
    const writeOff = -30000;

    untakenMeds.forEach(med => {
        const { id } = med;
        if(med.taken) {
            //med marked as taken
            assignMedTaken(id);
        } else {
            //med not marked as taken:
            //find remainingTime bracket
            const remainingTime = med.due - currentTime;
            const brackets = [writeOff, promptAfterSecond, promptAfterFirst, promptAt, promptBefore].filter(bracket => remainingTime <= bracket);
            const bracket = (brackets.length > 0) ?  brackets[0] : null;

            if(bracket === promptBefore) assignPromptBefore(med);
            if(bracket === promptAt) assignPromptAt(med);
            if(bracket === promptAfterFirst) assignPromptLate(med);
            if(bracket === promptAfterSecond) assignPromptVeryLate(med);
            if(bracket === writeOff) assignWriteOff(med);
            //else no reminder due, do nothing
        };
    });
};

module.exports = { selfQuery};