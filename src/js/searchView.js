class SearchView {
  _parentElement = document.querySelector('.search');
  _searchField = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search__field')
      .value.trim();
    // this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addhandlerSearch(handler) {
    this._searchField.addEventListener('input', handler);

    // this._parentElement.addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   handler();
    // });
  }
}

export default new SearchView();
