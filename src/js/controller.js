import { AJAX } from './helper';
import { API_URL } from './config';
import * as model from './model';
import searchView from './searchView';
import previewView from './previewView';
import filterView from './filterView';

import { async } from 'regenerator-runtime/runtime';

const loadAndRenderPreview = async function (endpoint, query = '') {
  try {
    // Render Spinner
    previewView.renderSpinner();

    // Get country(s) Data
    await model.loadSearch(endpoint, query);

    // Render country(s) Data
    previewView.render(model.state.search.results);
  } catch (err) {
    previewView.renderError('Hmmm... Something went wrong. Please try again');
    console.error(`There was a problem getting countries 💥💥💥💥 ${err}`);
  }
};

const controlLoad = async function () {
  // Load Data and Render to view
  await loadAndRenderPreview('all');
};

const controlSearch = async function () {
  // 1) Get Search Query
  const query = searchView.getQuery();
  if (!query) return;

  // 2) Load Data and Render to view
  await loadAndRenderPreview('name', query);
};

const controlFilter = async function (region) {
  loadAndRenderPreview('continent', region);
};

const init = function () {
  searchView.addhandlerSearch(controlSearch);
  filterView.addhandlerFilter(controlFilter);
  previewView.addHandlerLoad(controlLoad);
};

init();
