import { API_URL } from './config';
import { AJAX } from './helper';

export const state = {
  search: {
    query: '',
    results: [],
  },
};

export const loadSearch = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}name/${query}`);

    state.search.results = data.map(rec => {
      return {
        name: rec.name,
        nativeName: rec.nativeName,
        population: rec.population,
        region: rec.region,
        subregion: rec.subregion,
        capital: rec.capital,
        tld: rec.topLevelDomain[0],
        currencies: rec.currencies,
        languages: rec.languages,
        borders: rec.borders,
        flag: rec.flags.svg,
        code: rec.alpha3Code,
      };
    });
    // console.log(data);
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
