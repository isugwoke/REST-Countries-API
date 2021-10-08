import View from './view';

class CountryView extends View {
  _parentElement = document.querySelector('.country__box');

  _errorMessage = 'Hmmm... Something went Wrong. Pls try again';

  _message = '';

  _generateMarkup() {
    return `
        <div class="country__image-box">
        <img
          src="${this._data.flag}"
          alt="country flag"
          class="country__flag"
        />
      </div>

      <div class="country__info-container">
        <h2 class="heading--1">${this._data.name}</h2>
        <div class="country__info-box">
          <div class="country__info-group country__info-group--left">
            <div class="country__info">
              <span class="country__info-tag">Native Name: </span
              ><span>${this._data.nativeName}</span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Population: </span
              ><span>${this._data.population}</span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Region: </span
              ><span>${this._data.region}</span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Sub Region: </span
              ><span>${this._data.subregion}</span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Capital: </span
              ><span>${this._data.capital ? this._data.capital : ''}</span>
            </div>
          </div>
          <div class="country__info-group">
            <div class="country__info">
              <span class="country__info-tag">Top Level Domain: </span
              ><span>${this._data.tld}</span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Currencies: </span><span>${this._data.currencies
                .map(cur => `${cur.name}, `)
                .join('')} </span>
            </div>
            <div class="country__info">
              <span class="country__info-tag">Languages: </span
              ><span class="country__languages"
                >${this._data.languages
                  .map(lang => `${lang.name}, `)
                  .join('')}</span
              >
            </div>
          </div>
        </div>
        <div class="country__border-box">
                <div class="country__info-tag country__info-tag--borders">
                  Border Countries:
                </div>
                <div class="country__borders">
                ${this._data.borders
                  .map(
                    border =>
                      `<a href="?#${border.code}" class="btn country__border-link">${border.name}</a>`
                  )
                  .join('')}
                
                </div>
              </div>
      </div>
    `;
  }

  _generateMarkupBorders(border) {
    return `
    
      <a href="#${border.code}" class="btn country__border-link">${border.name}</a>

    `;
  }

  addHandlerLoad(handler) {
    ['load', 'hashchange'].forEach(ev => window.addEventListener(ev, handler));
  }
}

export default new CountryView();
