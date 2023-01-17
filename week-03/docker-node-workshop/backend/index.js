const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect();

connection.query('SELECT * FROM cities', (err, cities) => {
  if (err) {
    throw err;
  }
  cities.forEach((city) =>
    console.log(`${city.id}. ${city.capital} - ${city.country}`)
  );
});

const newCity = {
  capital: 'Paris',
  country: 'France',
};

const query = connection.query(
  'INSERT INTO cities SET ?',
  newCity,
  (err, results) => {
    if (err) {
      throw err;
    }

    console.log(results.affectedRows + ' record(s) inserted');
  }
);

console.log(query.sql);

connection.end();
