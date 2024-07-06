const express = require('express');
const { sendEmail } = require('../controllers/transactionalEmailController');

const router = express.Router();

router.post('/api/send-email', sendEmail);

module.exports = router;
