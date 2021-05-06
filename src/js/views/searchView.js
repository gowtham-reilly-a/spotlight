import View from "./view.js";

class SearchView extends View {
  _parentElement = document.querySelector(".header__search");
  _searchForm = document.querySelector("#header__search--form");
  _searchInput = document.querySelector("#header__search--input");
  _btnSearchOpen = document.querySelector(".header__search--open");
  _btnSearchClose = document.querySelector(".header__search--close");

  constructor() {
    super();
    this._parentElement.addEventListener(
      "click",
      this._toggleSearch.bind(this)
    );
  }

  hideSearchForm() {
    this._btnSearchOpen.classList.remove("hidden");
    this._btnSearchClose.classList.add("hidden");
    this._searchForm.classList.add("hidden");
  }

  _toggleSearch(e) {
    const btn = e.target;

    if (
      btn.closest(".header__search--close") ||
      btn.closest(".header__search--open")
    ) {
      this._btnSearchOpen.classList.toggle("hidden");
      this._btnSearchClose.classList.toggle("hidden");
      this._searchForm.classList.toggle("hidden");
    }

    if (btn.closest(".header__search--open")) {
      this._searchInput.focus();
    }
  }

  addHandlerSearchSubmit(handler) {
    this._searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const query = this.querySelector("#header__search--input").value;
      this.querySelector("#header__search--input").value = "";

      handler(query);
    });
  }
}

export default new SearchView();
