import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _data;
  _errorMessage = "No results available. Please try other keywords!";

  constructor() {
    super();
    this._parentElement.addEventListener("click", this._toggleInfo.bind(this));
  }
}

export default new ResultsView();
