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
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
        //send push notification
};

assignPromptAfterFirst = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - late`)
    const newStatus = 3
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
        //send push notification
};

assignPromptAfterSecond = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - very late`)
    const newStatus = 4
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
        //send push notification
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

assignWriteOff = (med) => {
    const { id, due, type, status } = med;
    console.log(`${id} - write off over-due med as untaken`)
    const newStatus = 9
    return connection('meds')
        .where({ id })
        .update({ status: newStatus })
        .returning('*')
        .then(([med]) => med.status)
};

assignDiscontinued = (med) => {
    const { id, due, type, status } = med;
    console.log('medication discontuned')
    //update statuts to 8
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