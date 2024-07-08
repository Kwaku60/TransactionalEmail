const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes'); // Import the routes
const webhookController = require('./controllers/webhookController');


let ngrokUrl = '';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes


// Configuration endpoint to update ngrok URL
app.post('/configure-ngrok', (req, res) => {
  ngrokUrl = req.body.ngrokUrl;
  res.send(`ngrok URL updated to ${ngrokUrl}`);
});


//Routes
app.use('/', (req, res, next) => {
  if (!ngrokUrl) {
    return res.status(500).send('ngrok URL not configured');
  }
  req.ngrokUrl = ngrokUrl;
  next();
}, emailRoutes);





// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
