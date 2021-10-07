import { API_URL } from './config';
import { AJAX } from './helper';

export const state = {
  search: {
    query: '',
    results: [],
  },
  country: {},
};

const formatNumber = function (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}name/${query}`);

    state.search.results = data.map(rec => {
      return {
        name: rec.name,
        population: rec.population,
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
