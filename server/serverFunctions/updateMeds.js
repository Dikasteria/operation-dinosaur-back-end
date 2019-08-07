const { connection } = require('../connection');
const { sendPush } = require('./sendPush');

assignPromptBefore = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - due soon`)
    const newStatus = 1;
    if(status < newStatus){
        console.log(`${id} - send "due soon" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(x => {
                const body = `your ${type} is due at ${due}`
                sendPush({ user_id: id, body })
            });
    };
};

assignPromptAt = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - due now`)
    const newStatus = 2
    if(status < newStatus){
        console.log(`${id} - send "due now" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(x => {
                const body = `your ${type} is due now`
                sendPush({ user_id: id, body })
            });
    };
};
    assignPromptLate = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - late`)
    const newStatus = 3
    if(status < newStatus){
        console.log(`${id} - send first "late" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(x => {
                const body = `your ${type} was due at ${due} and has not been recorded as taken`
                sendPush({ user_id: id, body })
            });
    };
};

assignPromptVeryLate = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - very late`)
    const newStatus = 4
    if(status < newStatus){
        console.log(`${id} - send second "late" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(x => {
                const body = `your ${type} was due at ${due} and has not been recorded as taken`
                sendPush({ user_id: id, body })
            });
    };
};

assignWriteOff = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - write off over-due med as untaken`)
    const newStatus = 9
    if(status < newStatus){
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(([med]) => med.status)
    };
};

assignMedTaken = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - marked as taken`)
    const newStatus = 10
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
};

assignDiscontinued = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - marked as discontinued`)
    const newStatus = 5
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
}


module.exports = {
    assignPromptBefore,
    assignPromptAt,
    assignPromptLate,
    assignPromptVeryLate,
    assignWriteOff,
    assignMedTaken,
    assignDiscontinued
}