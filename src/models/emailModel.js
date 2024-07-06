const db = require('../db'); //import db module, which provides the query function for interacting with the PostgreSQL database.


// log the details of an email sent.
// use parameterized queries to prevent SQL injection attacks.

//RETURNING * to ensure that the inserted row is returned by the query.
const createEmailLog = async (email, templateId, openRate, clickRate) => {
    const result = await db.query(
      'INSERT INTO emails (email, template_id, open_rate, click_rate) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, templateId, openRate, clickRate]
    );
    //The result of the query is returned, specifically the first row of the result set (result.rows[0]).
    return result.rows[0];
  };

  module.exports = {
    createEmailLog,
  };
