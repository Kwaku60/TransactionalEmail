const mailgun = require('mailgun-js');
require('dotenv').config();

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const sendTransactionalEmail = async ({ to, templateID, dynamicData }) => {
  console.log("here")
  const data = {
    from: 'kwakuklausphoto@gmail.com',
    to,
    template: templateID, // Mailgun template name
    'h:X-Mailgun-Variables': JSON.stringify(dynamicData),
  };
  console.log(data)

  try {
    console.log("trying");
    await mg.messages().send(data);
    console.log(`Email sent successfully to ${to} using template ${templateID}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendTransactionalEmail };
