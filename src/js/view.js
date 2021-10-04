import icons from '../img/sprite.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return console.log('Problem Displaying Data💥💥💥');

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    // Render items only when Images finishes loading
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <div></div>
        <div></div>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="message">
              <svg class="message__icon message__icon--error">
                  <use xlink:href="${icons}#icon-notification"></use>
              </svg>
              <p>${message}</p>
        </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
