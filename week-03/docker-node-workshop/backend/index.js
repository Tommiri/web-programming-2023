const cities = require('./cities');

const getCities = async () => {
  try {
    const result = await cities.findAll();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const createCity = async () => {
  const city = {
    capital: 'Stockholm',
    country: 'Sweden',
  };
  try {
    const result = await cities.create(city);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const closeConnection = async () => {
  try {
    console.log(await cities.close());
  } catch (error) {
    console.log(error);
  }
};

createCity();
getCities();
closeConnection();
