const router = require('express').Router();
const {
  getCities,
  createCity,
  deleteCity,
  getCityById,
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

router.get('/', getCities);

router.get('/:id', getCityById);

router.post('/', createCity);

router.delete('/:id', deleteCity);

module.exports = router;
