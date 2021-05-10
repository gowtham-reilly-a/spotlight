import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks");
  _btnShowBookmarks = document.querySelector(".header__bookmarks");
  _data;
  _title = "Bookmarks";
  _errorMessage = "Please bookmark some nice photos to see here!";

  constructor() {
    super();
    this._parentElement.addEventListener("click", this._toggleInfo.bind(this));
  }

  deleteCard(id) {
    const elID = "#" + id;
    const card = this._parentElement.querySelector(elID);
    card.remove();
  }

  addHandlerShowBookmarksBtn(handler) {
    this._btnShowBookmarks.addEventListener("click", handler);
  }
}

export default new BookmarksView();
