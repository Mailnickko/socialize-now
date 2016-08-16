const sendGrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const mailHelper = require('sendgrid').mail;

// Output: None
// Side Effects: Sends an email notification to an invitee
// Input: The event creator and invitee email addresses,
// the subject, and the email body
module.exports.sendNotification = (creator, invitee, subject, body) => {
  from = new mailHelper.Email(creator);
  to = new mailHelper.Email(invitee);
  content = new mailHelper.Content('text/plain', body);
  mail = new mailHelper.Mail(from, subject, to, content);

  const request = sendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sendGrid.API(request, (error, response) => {
    // This can be uncommented for testing purposes
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
};

