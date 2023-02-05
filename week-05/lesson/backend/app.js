const express = require('express');
const cities = require('./routes/cities');
const users = require('./routes/users');

const app = express();

app.use(express.json());
app.use('/api/cities', cities);
app.use('/api/users', users);

module.exports = app;
