const express = require('express');
const { sendEmail } = require('../controllers/transactionalEmailController');
const webhookController = require('../controllers/webhookController');


const router = express.Router();

router.post('/api/send-email', sendEmail);


router.post('/webhook/opened', (req, res, next) => {
    req.baseUrl = req.ngrokUrl;
    webhookController.handleOpened(req, res, next);
  });
  router.post('/webhook/clicked', (req, res, next) => {
    req.baseUrl = req.ngrokUrl;
    webhookController.handleClicked(req, res, next);
  });

module.exports = router;
