const Joi = require('joi');

const cities = require('../models/cities');

const getCities = async (req, res) => {
  try {
    const result = await cities.findAll();
    if (result) {
      res.status(200).json(result);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

const getCityById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await cities.findById(id);
    if (result.length === 1) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

const createCity = async (req, res) => {
  const schema = Joi.object({
    capital: Joi.string().min(4).required(),
    country: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const city = {
    capital: req.body.capital,
    country: req.body.country,
  };

  try {
    const isDuplicate = await cities.findByCity(city);
    if (isDuplicate.length > 0) {
      res.status(400).send('City already exists');
      return;
    }

    const result = await cities.create(city);
    if (result) {
      city.id = result.insertId;
      res.status(201).json(city);
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

const deleteCity = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const cityExists = await cities.findById(id);
    if (cityExists.length === 0) {
      res.status(404).send('Not Found');
      return;
    }

    const result = await cities.deleteById(id);
    if (result) {
      res.status(200).send('City deleted');
    }
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getCities,
  getCityById,
  createCity,
  deleteCity,
};
