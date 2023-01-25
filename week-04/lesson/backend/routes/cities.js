const router = require('express').Router();
const {
  getCities,
  createCity,
  deleteCity,
} = require('../controllers/cities');

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

router.get('/', getCities);

router.post('/', createCity);

router.delete('/:id', deleteCity);

module.exports = router;
