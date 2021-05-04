export default class View {
  updateHeaderTitle(title) {
    document.querySelector("#header__title--text").innerText = title;
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner"><ion-icon name="reload-outline"></ion-icon></div>
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  toggleView() {
    document.querySelector(".feed").classList.add("hidden");
    document.querySelector(".results").classList.add("hidden");
    document.querySelector(".bookmarks").classList.add("hidden");
    document.querySelector(".profile").classList.add("hidden");

    this._parentElement.classList.remove("hidden");
  }
}