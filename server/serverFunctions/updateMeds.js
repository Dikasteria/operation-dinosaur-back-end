const { connection } = require('../connection');

assignMedTaken = () => {
    console.log('medication marked as taken')
    //update status to 10
};

assignPromptBefore = () => {
    console.log('medication is due soon')
    //send push notification
    //update status to 1
};

assignPromptAt = () => {
    console.log('medication is due now')
    //send push notification
    //upate status to 2
};

assignPromptAfterFirst = () => {
    console.log('send first late reminder')
    //send push notification
    //update status to 3
};

assignPromptAfterSecond = () => {
    console.log('send second late reminder')
    //send push notification
    //update status to 4
};

assignWriteOff = () => {
    console.log('write off over-due medication as untaken')
    //update status to 9
};


module.exports = {
    assignMedTaken,
    assignPromptBefore,
    assignPromptAt,
    assignPromptAfterFirst,
    assignPromptAfterSecond,
    assignWriteOff
}