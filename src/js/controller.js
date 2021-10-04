import { AJAX } from './helper';
import { API_URL } from './config';
import * as model from './model';
import searchView from './searchView';
import previewView from './previewView';

import { async } from 'regenerator-runtime/runtime';

// const btn = document.querySelector('.filter__btn');
// const regions = document.querySelector('.filter__regions');
// const page = document.documentElement;
// const filteterIcon = document.querySelector('.filter__icon');

// btn.addEventListener('click', function (e) {
//   console.log(regions);
//   console.log(e.target);
//   regions.classList.toggle('filter__regions--expanded');
//   filteterIcon.classList.toggle('filter__icon-rotate');
// });

const controlSearch = async function () {
  try {
    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Render Spinner
    previewView.renderSpinner();

    // 3) Load search Result
    await model.loadSearch(query);

    // 4) Render Search Result to view
    previewView.render(model.state.search.results);
  } catch (err) {
    // Render Error to UI
    previewView.renderError();
    console.error(`No country Found. Pls try another Keyword 💥💥💥💥 ${err}`);
  }
};

const init = function () {
  searchView.addhandlerSearch(controlSearch);
};

init();
