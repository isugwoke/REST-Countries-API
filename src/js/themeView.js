import icons from '../img/sprite.svg';

class ThemeView {
  _parentElement = document.querySelector('.theme');
  _themeIcon = this._parentElement.querySelector('.theme__icon');

  constructor() {
    this._addHandlerLoadThemeFromStorage();
    this._AddHandlertoggleTheme();
  }

  setTheme(themeName, iconName) {
    localStorage.setItem('theme', themeName);
    localStorage.setItem('icon', iconName);

    document.documentElement.className = themeName;
    this._themeIcon.innerHTML = `<use xlink:href="${icons}#icon-${iconName}"></use>`;
  }
  toggleTheme() {
    if (document.documentElement.className === 'theme-dark') {
      this.setTheme('theme-light', 'moon-o');
    } else {
      this.setTheme('theme-dark', 'moon');
    }
  }

  LoadThemeFromStorage() {
    const lastTheme = localStorage.getItem('theme');
    const themeIcon = localStorage.getItem('icon');
    this.setTheme(lastTheme, themeIcon);
  }
  _AddHandlertoggleTheme() {
    this._parentElement.addEventListener('click', this.toggleTheme.bind(this));
  }

  _addHandlerLoadThemeFromStorage() {
    window.addEventListener('load', this.LoadThemeFromStorage.bind(this));
  }
}

export default new ThemeView();
