import { API_URL } from './config';
import { AJAX, formatNumber } from './helper';

export const state = {
  allCountries: [],
  search: {
    query: '',
    results: [],
  },
  country: {},
};

export const loadAllCountries = async function () {
  try {
    const data = await AJAX(`${API_URL}all/`);

    state.allCountries = data.map(rec => {
      return {
        name: rec.name,
        population: formatNumber(rec.population),
        region: rec.region,
        capital: rec.capital,
        flag: rec.flags.svg,
        code: rec.alpha3Code,
      };
    });
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};

export const filterSearch = function (query) {
  try {
    state.search.query = query;

    state.search.results = state.allCountries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    if (state.search.results.length < 1) throw new Error('No match');
  } catch (err) {
    throw err;
  }
};

export const filterRegion = function (region) {
  try {
    state.search.results = state.allCountries.filter(
      country => country.region.toLowerCase() === region.toLowerCase()
    );

    if (state.search.results.length < 1) throw new Error('No match');
  } catch (err) {
    throw err;
  }
};

const loadBorders = async function (borders) {
  if (!borders) return [];

  return await Promise.all(
    borders.map(async border => {
      const data = await AJAX(`${API_URL}alpha/${border}`);
      return { name: data.name, code: data.alpha3Code };
    })
  );
};

export const loadCountry = async function (code) {
  try {
    const data = await AJAX(`${API_URL}alpha/${code}`);
    state.country = {
      name: data.name,
      nativeName: data.nativeName,
      population: formatNumber(data.population),
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.topLevelDomain[0],
      currencies: data.currencies,
      languages: data.languages,
      borders: await loadBorders(data.borders),
      flag: data.flags.svg,
      code: data.alpha3Code,
    };
  } catch (err) {
    console.error(`💥💥💥 ${err}`);
    throw err;
  }
};
