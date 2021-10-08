import View from './view';

class previewView extends View {
  _parentElement = document.querySelector('.preview-container');

  _errorMessage =
    'Oops! .... There seems to be no match for your search. Pls try another keyword';

  _message = '';

  _generateMarkup() {
    return `
        ${this._data.map(this._generateMarkupPreview).join('')} 
    
    `;
  }
  _generateMarkupPreview(preview) {
    return `
        <a href="./country.html?#${preview.code}" class="preview__link">
            <figure class="preview">
                    <img
                        src="${preview.flag}"
                        alt="preview country flag"
                        class="preview__img"
                        />
                    <figcaption class="preview__details-box">
                    <h3 class="preview__name">${preview.name}</h3>
                    <div class="preview__info-box">
                        <span class="preview__info-tag">Population: </span>
                        <span class="preview-info"
                        >${preview.population}</span
                        >
                    </div>
                    <div class="preview__info-box">
                        <span class="preview__info-tag">Region: </span>
                        <span class="preview__info">${preview.region}</span>
                    </div>
                    <div class="preview__info-box">
                        <span class="preview__info-tag">Capital: </span>
                        <span class="preview__info">${preview.capital}</span>
                    </div>
                </figcaption>
            </figure>
        </a>
    `;
  }
}

export default new previewView();
