const sendGrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const mailHelper = require('sendgrid').mail;
const Promise = require('bluebird');

// Output: A promise which resolves to SendGrid's response
// Side Effects: Sends an email notification to an invitee
// Input: The event creator and invitee email addresses,
// the subject, and the email body
module.exports.sendNotification = (creator, invitee, subject, body) => {
  const from = new mailHelper.Email(creator);
  const to = new mailHelper.Email(invitee);
  const content = new mailHelper.Content('text/plain', body);
  const mail = new mailHelper.Mail(from, subject, to, content);

  const request = sendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return Promise.promisify(sendGrid.API)(request);
};
