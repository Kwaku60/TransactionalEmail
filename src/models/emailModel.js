const db = require('../db'); //import db module, which provides the query function for interacting with the PostgreSQL database.


// log the details of an email sent.
// use parameterized queries to prevent SQL injection attacks.

//RETURNING * to ensure that the inserted row is returned by the query.
const createEmailLog = async (messageId, email, templateId, openRate, clickRate) => {
    const result = await db.query(
      'INSERT INTO emails (message_id, email, template_id, open_rate, click_rate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [messageId, email, templateId, openRate, clickRate]
    );
    //The result of the query is returned, specifically the first row of the result set (result.rows[0]).
    return result.rows[0];
  };


  const findOne = async (messageId) => {
    const result = await db.query('SELECT * FROM emails WHERE message_id = $1', [messageId]);
    return result.rows[0];
  };

const updateEmailLog = async (messageId, openRate, clickRate) => {
  const result = await db.query(
    'UPDATE emails SET open_rate = $2, click_rate = $3 WHERE message_id = $1 RETURNING *',
    [messageId, openRate, clickRate]
  );
  return result.rows[0];
};

  module.exports = {
    createEmailLog,
    findOne,
    updateEmailLog,
  };
