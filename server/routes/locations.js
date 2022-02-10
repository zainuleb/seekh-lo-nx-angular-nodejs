const express = require('express');
const router = express.Router();

//Get All Locations
const rawLocationData = require('../data/locationData.json');

//Filter Location Data
const filterLocationFoo = async (rawLocationData) => {
  const filteredData = await rawLocationData.map((location) => {
    const newLocation = {
      id: location.id,
      name: location.name,
      states: location.states.map((state) => {
        return {
          id: state.id,
          name: state.name,
          cities: state.cities.map((city) => {
            return {
              id: city.id,
              name: city.name,
              zip: city.zip,
            };
          }),
        };
      }),
    };
    return newLocation;
  });

  return filteredData;
};

//Get All Countries
router.get(`/`, async (req, res) => {
  const rawCountryList = await filterLocationFoo(rawLocationData);
  const filteredCountryList = rawCountryList.map((country) => {
    return {
      id: country.id,
      name: country.name,
    };
  });

  if (!filteredCountryList) {
    res.status(500).json({ success: false });
  }

  res.send(filteredCountryList);
});

//Get All States of a Country
router.get('/:id', async (req, res) => {
  try {
    const rawCountryList = await filterLocationFoo(rawLocationData);
    const filterCountry = await rawCountryList.filter(
      (country) => country.id == req.params.id
    );

    const filterStates = await filterCountry[0].states.map((state) => {
      return {
        id: state.id,
        name: state.name,
      };
    });

    res.send(filterStates);
  } catch (error) {
    return res.status(401).send({ success: false, message: error });
  }
});

//Get All Cities of a State
router.get('/:id/:stateId', async (req, res) => {
  try {
    const rawCountryList = await filterLocationFoo(rawLocationData);
    const filterCountry = await rawCountryList.filter(
      (country) => country.id == req.params.id
    );

    const filterState = await filterCountry[0].states.filter(
      (state) => state.id == req.params.stateId
    );

    const filterCities = await filterState[0].cities.map((city) => {
      return {
        id: city.id,
        name: city.name,
      };
    });

    res.send(filterCities);
  } catch (error) {
    return res.status(401).send({ success: false, message: error });
  }
});

module.exports = router;
