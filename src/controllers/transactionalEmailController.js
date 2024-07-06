const { sendTransactionalEmail } = require('../services/transactionalEmailService');
const { createEmailLog } = require('../models/emailModel');


const sendEmail = async (req, res) => {
    console.log("sendingv")
    const { to, templateID, dynamicData } = req.body;
    try {
      // Send  email
      console.log("sending")
      await sendTransactionalEmail({ to, templateID, dynamicData });

      // Log the email details into the database
      const emailLog = await createEmailLog(to, templateID, 0, 0); // Initial openRate and clickRate

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  };

  module.exports = { sendEmail };
