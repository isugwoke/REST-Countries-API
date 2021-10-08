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
         <span class = 'message__smiley'>:(</span> <span class = message__info> ${message} </span>
        </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
