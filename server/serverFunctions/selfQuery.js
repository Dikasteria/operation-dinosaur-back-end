const { connection } = require('../connection');
const {
    assignMedTaken,
    assignPromptBefore,
    assignPromptAt,
    assignPromptAfterFirst,
    assignPromptAfterSecond,
    assignWriteOff } = require('./updateMeds');

selfQuery = async () => {

    const untakenMeds =
        await connection
            .select('*')
            .from('meds')
            .whereNotIn('status', [9,10])
            .returning('*')

    const currentTime = new Date(Date.now());
    const dueTimes = untakenMeds.map(med => med.due)
    const remainingTimes = dueTimes.map(dueTime => (dueTime - currentTime));
    
    // console.log(untakenMeds);
    // console.log(currentTime, 'currentTime');
    // console.log(dueTimes, 'due times');
    console.log(remainingTimes, 'remaining times');

    //set times at which to prompt user
    const promptBefore = 5000;
    const promptAt = 0;
    const promptAfterFirst = -5000;
    const promptAfterSecond = -10000;
    const writeOff = -15000;

    untakenMeds.forEach(med => {

        //check if user has marked as taken
        if(med.taken) assignMedTaken();

        //medication not marked as taken:
        //
        //find remaining time bracket
        const remainingTime = med.due - currentTime;
        const brackets = [writeOff, promptAfterSecond, promptAfterFirst, promptAt, promptBefore];
        while(remainingTime > brackets[0]) brackets.shift();
        let bracket = 0;
        if(brackets.length ===0) return;    // no reminders due
        else bracket = brackets[0];

        if(bracket === writeOff) assignWriteOff();
        if(bracket === promptAfterSecond) assignPromptAfterSecond();
        if(bracket === promptAfterFirst) assignPromptAfterFirst();
        if(bracket === promptAt) assignPromptAt();
        if(bracket === promptBefore) assignPromptBefore();

    });
};

module.exports = { selfQuery};