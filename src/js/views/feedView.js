import View from "./view.js";

class FeedView extends View {
  _parentElement = document.querySelector(".feed");
  _data;
  _title = "Feed";

  constructor() {
    super();
    this._parentElement.addEventListener("click", this._toggleInfo.bind(this));
  }

  addHandlerLogo(handler) {
    document.getElementById("brand").addEventListener("click", handler);
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }
}

export default new FeedView();
