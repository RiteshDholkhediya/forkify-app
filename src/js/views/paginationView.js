import View from './View.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtons(curPage, 'n');
    }

    //Last page

    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtons(curPage, 'p');
    }
    // Other page

    if (curPage < numPages) {
      const prevButton = this._generateMarkupButtons(curPage, 'p');

      const nextButton = this._generateMarkupButtons(curPage, 'n');

      return prevButton + nextButton;
    }

    // Page 1,  and there are no other pages
    return '';
  }

  _generateMarkupButtons(currentPage, buttonType = 'p') {
    let markup = ``;
    if (buttonType == 'p' || buttonType == 'P') {
      markup = `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    
    `;
    } else if (buttonType == 'n' || buttonType == 'N') {
      markup = `
        <button data-goto= "${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    
    `;
    }

    return markup;
  }
}

export default new PaginationView();
