const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const cities = {
  findAll: () =>
    new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cities', (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    }),

  create: (newCity) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        'INSERT INTO cities SET ?',
        newCity,
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
      console.log(query.sql);
    }),

  close: () =>
    new Promise((resolve, reject) => {
      connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve('Connection closed successfully.');
      });
    }),
};

module.exports = cities;
