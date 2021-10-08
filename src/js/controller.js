import { AJAX } from './helper';
import { API_URL } from './config';
import * as model from './model';
import searchView from './searchView';
import previewView from './previewView';
import filterView from './filterView';

import { async } from 'regenerator-runtime/runtime';

const controlSearch = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Render Spinner
    previewView.renderSpinner();

    // 3) Load search Result
    await model.loadSearch('name', query);

    // 4) Render Search Result to view
    previewView.render(model.state.search.results);
  } catch (err) {
    // Render Error to UI
    previewView.renderError();
    console.error(`No country Found. Pls try another Keyword 💥💥💥💥 ${err}`);
  }
};

const controlFilter = async function (region) {
  try {
    // Render spinner
    previewView.renderSpinner();
    // Get country Data
    await model.loadSearch('continent', region);

    // Render country Data
    previewView.render(model.state.search.results);
  } catch (err) {
    previewView.renderError('Hmmm... Something went wrong. Please try again');
    console.error(`There was a problem getting region 💥💥💥💥 ${err}`);
  }
};

const init = function () {
  searchView.addhandlerSearch(controlSearch);
  filterView.addhandlerFilter(controlFilter);
};

init();
