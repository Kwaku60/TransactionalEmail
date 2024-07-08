const mailgun = require('mailgun-js');
require('dotenv').config();

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;
const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const sendTransactionalEmail = async ({ to, templateID, dynamicData }) => {
  const data = {
    from: 'no-reply@mg.kwakuandrew.com',
    to,
    template: templateID, // Mailgun template name
    'h:X-Mailgun-Variables': JSON.stringify(dynamicData),
    'o:tracking': 'yes',            // Enable overall tracking
    'o:tracking-clicks': 'yes',     // Enable click tracking
    'o:tracking-opens': 'yes'      // Enable open tracking
  };
  console.log(data)

  try {
    const result = await mg.messages().send(data);
    return result; //return the entire result object, including messageId
    console.log(`Email sent successfully to ${to} using template ${templateID}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendTransactionalEmail };
