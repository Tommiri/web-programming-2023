const db = require('../db/pool');

const handleQuery = (query, ...values) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
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

const cities = {
  findAll: () => handleQuery('SELECT * FROM cities;'),

  findById: (id) =>
    handleQuery('SELECT * FROM cities WHERE id = ?;', id),

  findByCity: (city) =>
    handleQuery(
      'SELECT * FROM cities WHERE capital LIKE ? AND country LIKE ?;',
      [city.capital, city.country]
    ),

  create: (city) => handleQuery('INSERT INTO cities SET ?;', city),

  deleteById: (id) =>
    handleQuery('DELETE FROM cities WHERE id = ?;', id),

  updateById: (city) =>
    handleQuery('UPDATE cities SET ? WHERE id = ?;', [city, city.id]),
};

module.exports = cities;
