const pool = require('../db/pool');

const handleQuery = (query, ...values) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      connection.query(query, ...values, (err, result) => {
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });

module.exports = handleQuery;
