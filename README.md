# Transactional Email Service

This project is a transactional email service built with Node.js and React. It uses the Postmark API to send emails and track open and click rates, and PostgreSQL to handle state.

## Prerequisites

- Node.js (v16.x or later recommended)
- PostgreSQL (latest version)
- Postmark API account and API key

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/transactional-email-service.git
cd transactional-email-service

### 2. Install Dependencies
npm install

cd client
npm install

### 3. set Environmental Variables
API_KEY=
DATABASE_URL=


### 4. set up postgres DB
psql -U postgres
CREATE DATABASE transactional_service;
CREATE USER email_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE email_db TO email_user;


##5. Create DB Tables
psql -U email_user -d transactional_service -f db/schema.sql

##6. run the node server
npx nodemon src/app.js

#7 Start frontend
cd email-client
npm start

#8 use:
# Open your browser and navigate to http://localhost:3000 to view the React UI.
# Use the UI to send transactional emails and track open and click rates.





#######
#NOTE:
#postmark requires work email to sign up for an api, I currently only have my gmail, so needed to pivot to an alternative api
