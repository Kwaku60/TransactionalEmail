const { sendTransactionalEmail } = require('../services/transactionalEmailService');
const { createEmailLog } = require('../models/emailModel');


const sendEmail = async (req, res) => {
    const { to, templateID, dynamicData } = req.body;
    try {
      // Send  email, capture messageId from the result
      const result = await sendTransactionalEmail({ to, templateID, dynamicData });
      const messageId = result.id; // Extract messageId from Mailgun response

      // Log the email details into the database
      const emailLog = await createEmailLog(messageId, to, templateID, 0, 0); // Initial openRate and clickRate

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  };

  module.exports = { sendEmail };
