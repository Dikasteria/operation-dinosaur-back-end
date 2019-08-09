const { connection } = require("../connection");
const { sendPush } = require("./sendPush");
import moment from "moment";

convertTime = time => {
  return moment(time)
    .subtract(1, "hour")
    .format("LT");
};

assignPromptBefore = med => {
  const { id, due, type, status } = med;

  const newStatus = 1;
  if (status !== newStatus) {
    return connection("meds")
      .where({ id })
      .update({ status: newStatus })
      .returning("*")
      .then(x => {
        const body = `your ${type} is due at ${convertTime(due)}`;
        sendPush({ user_id: id, body });
      });
  }
};

assignPromptAt = med => {
  const { id, due, type, status } = med;

  const newStatus = 2;
  if (status !== newStatus) {
    return connection("meds")
      .where({ id })
      .update({ status: newStatus })
      .returning("*")
      .then(x => {
        const body = `your ${type} is due now`;
        sendPush({ user_id: id, body });
      });
  }
};

assignPromptLate = med => {
  const { id, due, type, status } = med;

  const newStatus = 3;
  if (status !== newStatus) {
    return connection("meds")
      .where({ id })
      .update({ status: newStatus })
      .returning("*")
      .then(x => {
        const body = `your ${type} was due at ${convertTime(
          due
        )} and has not been recorded as taken`;
        sendPush({ user_id: id, body });
      });
  }
};

assignPromptVeryLate = med => {
  const { id, due, type, status } = med;

  const newStatus = 4;
  if (status !== newStatus) {
    return connection("meds")
      .where({ id })
      .update({ status: newStatus })
      .returning("*")
      .then(x => {
        const body = `your ${type} was due at ${convertTime(
          due
        )} and has not been recorded as taken`;
        sendPush({ user_id: id, body });
      });
  }
};

assignWriteOff = med => {
  const { id, due, type, status } = med;

  const newStatus = 9;
  if (status !== newStatus) {
    return connection("meds")
      .where({ id })
      .update({ status: newStatus })
      .returning("*")
      .then(x => {});
  }
};

assignMedTaken = med => {
  const { id, due, type, status } = med;

  const newStatus = 10;
  return connection("meds")
    .where({ id })
    .update({ status: newStatus })
    .returning("*")
    .then(([med]) => {
      const { type, due, user_id } = med;
      const newDue = due + 86400000;
      const newMed = [{ user_id, type, due: newDue }];
      return connection
        .insert(newMed)
        .into("meds")
        .returning("*")
        .then(x => {});
    });
};

assignDiscontinued = med => {
  const { id, due, type, status } = med;

  const newStatus = 5;
  return connection("meds")
    .where({ id })
    .update({ status: newStatus })
    .returning("*")
    .then(x => {});
};

module.exports = {
  assignPromptBefore,
  assignPromptAt,
  assignPromptLate,
  assignPromptVeryLate,
  assignWriteOff,
  assignMedTaken,
  assignDiscontinued
};
