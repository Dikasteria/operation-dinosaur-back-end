const { connection } = require('../connection');

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
            .then(([med]) => med.status)
            //send push notification
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
            .then(([med]) => med.status)
            //send push notification
    };
};

assignPromptAfterFirst = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - late`)
    const newStatus = 3
    if(status < newStatus){
        console.log(`${id} - send first "late" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(([med]) => med.status)
            //send push notification
    };
};

assignPromptAfterSecond = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - very late`)
    const newStatus = 4
    if(status < newStatus){
        console.log(`${id} - send second "late" notification`)
        return connection('meds')
            .where({ id })
            .update({ status: newStatus })
            .returning('*')
            .then(([med]) => med.status)
            //send push notification
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
    assignMedTaken,
    assignPromptBefore,
    assignPromptAt,
    assignPromptAfterFirst,
    assignPromptAfterSecond,
    assignWriteOff,
    assignDiscontinued
}