const sendGrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
const mailHelper = require('sendgrid').mail;

// Output: None
// Side Effects: Sends an email notification out to each invitee
// Input: The event creator, an array of all the invitees,
// the subject, and the email body
// Note: The creator and invitees are represented as a "User" object
const sendNotification = (creator, invitees, subject, body) => {
  invitees.forEach(invitee => {
    from = new mailHelper.Email(creator.email);
    to = new mailHelper.Email(invitee.email);
    content = new mailHelper.Content('text/plain', body);
    mail = new mailHelper.Mail(from, subject, to, content);

    const request = sendGrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sendGrid.API(request, (error, response) => {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  });
};
