const { connection } = require('../connection');

exports.getEvents = ({ user_id }) => {
  return connection('events')
    .where({ user_id })
    .returning('*')
    .then(returnedEvents => {
      if (returnedEvents.length < 1)
        return Promise.reject({ status: 404, msg: 'No Events found' });
      else return returnedEvents;
    });
};

exports.postEvent = ({ user_id, description }) => {
  const event = { user_id, description };
  return connection
    .insert(event)
    .into('events')
    .returning('*')
    .then(([addedEvent]) => {
      return addedEvent;
    });
};

exports.patchEvent = ({ event_id, description, time }) => {
  return connection('events')
    .where({ id: event_id })
    .update({ description, time })
    .returning('*')
    .then(([patchedEvent]) => {
      return patchedEvent;
    });
};

exports.deleteEvent = ({ event_id }) => {
  return connection('events')
    .where({ id: event_id })
    .delete();
};
