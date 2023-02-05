const handleQuery = require('./handleQuery');

const users = {
  create: (user) => handleQuery('INSERT INTO users SET ?;', user),
  findByEmail: (email) =>
    handleQuery('SELECT * FROM users WHERE email LIKE ?;', email),
};

module.exports = users;
