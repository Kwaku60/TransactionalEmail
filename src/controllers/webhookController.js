const EmailLog = require('../models/emailModel');

const handleOpened = async (req, res) => {

  const { 'event-data': eventData } = req.body;

  try {
    const rawMessageId = eventData.message.headers['message-id'];
    const messageId =  `<${rawMessageId}>`;
    console.log('Message ID:', messageId);

    if (!messageId) {
        console.error('Message ID not found in webhook payload');
        return res.status(400).send('Message ID not found');
      }

      const existingEmailLog = await EmailLog.findOne(messageId);

    if (existingEmailLog) {
      const updatedEmailLog = await EmailLog.updateEmailLog(messageId, existingEmailLog.open_rate + 1, existingEmailLog.click_rate);
      console.log(`Email log updated for ${messageId}:`, updatedEmailLog);
    } else {
      console.error(`Email log not found for ${messageId}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling opened event:', error);
    res.status(500).send('Error');
  }
};

const handleClicked = async (req, res) => {
  const { 'event-data': eventData } = req.body;

  try {
    const rawMessageId = eventData.message.headers['message-id'];
    const messageId =  `<${rawMessageId}>`;

    if (!messageId) {
        console.error('Message ID not found in webhook payload');
        return res.status(400).send('Message ID not found');
      }

    const existingEmailLog = await EmailLog.findOne(messageId);

    if (existingEmailLog) {
      const updatedEmailLog = await EmailLog.updateEmailLog(messageId, existingEmailLog.open_rate, existingEmailLog.click_rate + 1);
      console.log(`Email log updated for ${messageId}:`, updatedEmailLog);
    } else {
      console.error(`Email log not found for ${messageId}`);
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling clicked event:', error);
    res.status(500).send('Error');
  }
};

module.exports = { handleOpened, handleClicked };
