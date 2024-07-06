const { Pool } = require('pg'); //postgres client for node
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
}); // new connection pool for reusable db connections
//educes the time and resources required to establish new connections ->  better performance and scalability.

module.exports = {
  query: (text, params) => pool.query(text, params), //text will be the query, params params used in query
};


//simple example
// const getUsers = async () => {
//     const result = await db.query('SELECT * FROM users');
//     return result.rows;
//   };
