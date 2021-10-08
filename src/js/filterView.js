class FilterView {
  _parentElement = document.querySelector('.filter');
  _filterBar = this._parentElement.querySelector('.filter__box');
  _filterRegions = this._parentElement.querySelector('.filter__regions');
  _filterIcon = this._parentElement.querySelector('.filter__icon');

  constructor() {
    this._addhandlerToggleFilter();
    this._addhandlerCollapseFilter();
  }

  toggleFilter() {
    this._filterRegions.classList.toggle('filter__regions-expanded');
    this._filterIcon.classList.toggle('filter__icon-rotate');
  }

  collapseFilter(e) {
    if (e.target.closest('.filter__box')) return;
    if (this._filterRegions.classList.contains('filter__regions-expanded')) {
      this._filterRegions.classList.remove('filter__regions-expanded');
      this._filterIcon.classList.remove('filter__icon-rotate');
    }
  }

  _addhandlerToggleFilter() {
    this._filterBar.addEventListener('click', this.toggleFilter.bind(this));
  }
  _addhandlerCollapseFilter() {
    window.addEventListener('click', this.collapseFilter.bind(this));
  }

  addhandlerFilter(handler) {
    this._filterRegions.addEventListener('click', function (e) {
      const region = e.target.dataset.region;
      if (!region) return;
      handler(region);
    });
  }
}

export default new FilterView();
