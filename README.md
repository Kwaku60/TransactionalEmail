# Transactional Email Service

This project is a transactional email service built with Node.js and React. It uses the Postmark API to send emails and track open and click rates, and PostgreSQL to handle state.

## Prerequisites

- Node.js (v16.x or later recommended)
- PostgreSQL (latest version)
- Mailgun API account and API key

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/transactional-email-service.git
cd transactional-email-service

### 2. Install Dependencies.
npm install

cd email-frontend
npm install

### 3. set Environmental Variables
MAILGNU_NAPI_KEY=
DATABASE_URL=


### 4. set up postgres DB
psql -U postgres
CREATE DATABASE transactional_service;
CREATE USER email_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE email_db TO email_user;


##5. Create DB Tables
psql -U email_user -d transactional_service -f db/schema.sql

##6. run the node server
npm start

#7 Start frontend
cd email-client
npm start
#likely will need to select an alternative port for hsoting 30001

#create a public URL for receiving email analytics
brew install ngrok
#(create an account if dont have one)
ngrok http 3000

#grab the forwarding url

#run this curl to dynmaically update the value
curl -X POST http://localhost:3000/configure-ngrok -H "Content-Type: application/json" -d '{"ngrokUrl": "https://<endpoint>.ngrok-free.app"}'

#update your base url with webhook endpoint such as webhook/opened in mailgun webhook set up with the above URL




#8 use:
# Open your browser and navigate to http://localhost:3001 to view the React UI.
# Use the UI to send transactional emails and track open and click rates.

#should see success messages in terminal, paired with DB updates, storing sent emails, open rate, click rate





#######
#NOTE:
#postmark requires work email to sign up for an api, I currently only have my gmail, so needed to pivot to an alternative api
