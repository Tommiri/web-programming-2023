const cities = require('../models/cities');

const getCities = async (req, res) => {
  try {
    const result = await cities.findAll();
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

const createCity = async (req, res) => {
  const city = {
    capital: req.body.capital,
    country: req.body.country,
  };

  try {
    const result = await cities.create(city);
    if (result) {
      city.id = result.insertId;
      res.status(201).send(city);
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

const deleteCity = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await cities.deleteById(id);
    if (result) {
      res.status(204).json(result);
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getCities,
  createCity,
  deleteCity,
};
