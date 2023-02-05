const router = require('express').Router();
const {
  getCities,
  createCity,
  deleteCity,
  getCityById,
} = require('../controllers/cities');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getCities);
router.get('/:id', getCityById);

// Call the verify token function
router.use(verifyToken);

// Authenticated routes
router.post('/', createCity);
router.delete('/:id', deleteCity);

module.exports = router;
