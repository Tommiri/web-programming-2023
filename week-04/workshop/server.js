const express = require('express');
const cities = require('./routes/cities');
require('dotenv').config();

const app = express();
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`URL: ${req.url}`);
  next();
};

app.use(loggingMiddleware);

app.get('/', (req, res) => {
  res.status(200).send('Hello Fellow Backend Developer!');
});

app.get('/api', (req, res) => {
  res.send('The Cities API');
});

app.use('/api/cities', cities);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}...`);
});
