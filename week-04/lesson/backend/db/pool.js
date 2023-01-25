const mysql = require('mysql2');
require('dotenv').config();

// Couldn't get the pool to work so I changed it to a singular connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = pool;
