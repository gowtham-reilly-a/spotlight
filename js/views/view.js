export default class View {
  updateHeaderTitle(title = "Feed") {
    document.querySelector("#header__title--text").innerText = title;
  }

  _toggleInfo(e) {
    const btn = e.target.closest(".card__info");
    if (!btn) return;

    e.target
      .closest(".card")
      .querySelector(".card__body--overlay")
      .classList.toggle("hidden");
  }

  addHandlerDownload(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".photo__download");
      if (!btn) return;

      const id = btn.closest(".card").getAttribute("id");
      handler(id);
    });
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

  switchView() {
    document.querySelector(".feed").classList.add("hidden");
    document.querySelector(".results").classList.add("hidden");
    document.querySelector(".bookmarks").classList.add("hidden");
    document.querySelector(".profile").classList.add("hidden");

    this._parentElement.classList.remove("hidden");
  }
}
