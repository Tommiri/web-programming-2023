const { reset } = require('nodemon');

const router = require('express').Router();

let cities = [
  {
    id: 1,
    capital: 'Oslo',
    country: 'Norway',
  },
  {
    id: 2,
    capital: 'Paris',
    country: 'France',
  },
  {
    id: 3,
    capital: 'Pretoria',
    country: 'South Africa',
  },
];

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const city = cities.find((item) => item.id === id);
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ message: `City with id ${id} not found` });
  }
});

router.get('/', (req, res) => {
  res.json(cities);
});

router.post('/', (req, res) => {
  console.log(req.body);
  const city = {
    id: cities.length + 1,
    capital: req.body.capital,
    country: req.body.country,
  };
  cities.push(city);
  res.send('POST route');
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const city = cities.find((item) => item.id === id);
  if (city) {
    const index = cities.indexOf(city);
    cities.splice(index, 1);
    res.json(city);
  } else {
    res.status(404).json({ message: "Requested id wasn't found" });
  }
});

module.exports = router;
