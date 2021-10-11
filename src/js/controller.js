import { AJAX } from './helper';
import { API_URL } from './config';
import * as model from './model';
import searchView from './searchView';
import previewView from './previewView';
import filterView from './filterView';

import { async } from 'regenerator-runtime/runtime';

const controlLoad = async function () {
  try {
    // Render Spinner
    previewView.renderSpinner();

    // Get country(s) Data
    await model.loadAllCountries();

    // Render country(s) Data
    previewView.render(model.state.allCountries);
  } catch (err) {
    previewView.renderError('Hmmm... Something went wrong. Please try again');
    console.error(`There was a problem getting countries 💥💥💥💥 ${err}`);
  }
};

const controlSearch = function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Filter Countries based on query
    model.filterSearch(query);

    // 3) Render Countures Data to view
    previewView.render(model.state.search.results);
  } catch (err) {
    previewView.renderError(
      'Oops! .... There seems to be no match for your search. Pls try another keyword'
    );
    console.error(`There was a problem getting countries 💥💥💥💥 ${err}`);
  }
};

const controlFilter = function (region) {
  try {
    // 2) Filter Countries based on
    model.filterRegion(region);

    // 3) Render Countures Data to view
    previewView.render(model.state.search.results);
  } catch (err) {
    previewView.renderError('Oops!!... Something went wrong. Pls try again');
    console.error(`There was a problem getting region data 💥💥💥💥 ${err}`);
  }
};

const init = function () {
  searchView.addhandlerSearch(controlSearch);
  filterView.addhandlerFilter(controlFilter);
  previewView.addHandlerLoad(controlLoad);
};

init();
