const { connection } = require("../connection");
const { Expo } = require("expo-server-sdk");
let expo = new Expo();

// Invoke sendPush with a user_id and body to send a push message
// to all devices associated with that user_id, containing body.

exports.sendPush = ({ user_id, body }) => {
  return connection
    .select("push_key")
    .from("devices")
    .where({ user_id })
    .then(pushKeys => {
      // DB returns array of objects => get values from keys
      const pushTokens = pushKeys.map(pushKey => pushKey.push_key);
      sendPushNotifications(pushTokens, body);

      sendPushNotifications(pushTokens, body);
    });
};

function sendPushNotifications(pushTokens, body) {
  // Create the messages
  let messages = [];
  pushTokens.forEach(pushToken => {
    // Check token is valid
    if (Expo.isExpoPushToken(pushToken)) {
      messages.push({
        to: pushToken,
        sound: "default",
        body,
        data: {}
      });
    } else {
      // console.error(`Push token ${pushToken} is not a valid Expo push token`);
    }
  });

  // Divide messages into chunks
  let chunks = expo.chunkPushNotifications(messages);

  // Send chunks and collect tickets
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        // console.error(error);
      }
    }
  })();

  // Remainder of the code relates to collecting receipts and handling errors
  //

  // After the Expo push notification service has delivered the notifications
  // a "receipt" for each notification is created. ID of each receipt is sent
  // back in the response "ticket" for each notification.
  //
  // The receipts may contain error codes to which you must respond appropriately.
  // Apple or Google may block apps that continue to send notifications to
  // devices that have blocked notifications or have uninstalled your app.
  //
  // NOTE: Not all tickets have IDs; for example, tickets for notifications
  // that could not be enqueued will have error information and no receipt ID.

  // Collect receiptIds from tickets

  // let receiptIds = [];
  // tickets.forEach(ticket => {
  //     if (ticket.id) {
  //         receiptIds.push(ticket.id);
  //     };
  // });

  // let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  // (async () => {
  //     for (let chunk of receiptIdChunks) {
  //         try {
  //             let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
  //             for (let receipt of receipts) {
  //                 if (receipt.status === 'ok') {
  //                     continue;
  //                 } else if (receipt.status === 'error') {
  //                     console.error(`There was an error sending a notification: ${receipt.message}`);
  //                     if (receipt.details && receipt.details.error) {
  //                     // The error codes are listed in the Expo documentation:
  //                     // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
  //                     // You must handle the errors appropriately.
  //                         console.error(`The error code is ${receipt.details.error}`);
  //                     };
  //                 };
  //             };
  //         } catch (error) {
  //             console.error(error);
  //         };
  //     };
  // })();
}
