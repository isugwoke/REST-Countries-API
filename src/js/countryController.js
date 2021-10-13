import * as model from './model';
import countryView from './countryView';
import themeView from './themeView';

import { async } from 'regenerator-runtime/runtime';

const controlCountrySearch = async function () {
  try {
    // 1) Get country Code
    const countryCode = window.location.hash.slice(1);
    if (!countryCode) return;

    //  2) Render Spinner
    countryView.renderSpinner();

    // 3) Load country Data
    await model.loadCountry(countryCode);

    // await model.loadBorders(model.state.country.borders);
    // console.log(model.state.country.borders);

    // 4) Render Data to UI
    countryView.render(model.state.country);
  } catch (err) {
    countryView.renderError();
    console.error(` ${err} 💥💥💥`);
  }
};

countryView.addHandlerLoad(controlCountrySearch);
