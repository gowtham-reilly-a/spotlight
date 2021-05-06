export default class View {
  updateHeaderTitle(title = this._title) {
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

  addHandlerUsername(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".photographer__username");

      if (!btn) return;

      const username = btn.dataset.username;

      handler(username);
    });
  }

  updateBookmark(id) {
    const el = document
      .getElementById(`${id}`)
      .querySelector(".photo__bookmark")
      .querySelector("ion-icon");

    const elName = el.getAttribute("name");

    if (elName === "bookmark-outline")
      return el.setAttribute("name", "bookmark-sharp");

    if (elName === "bookmark-sharp")
      el.setAttribute("name", "bookmark-outline");
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".photo__bookmark");
      if (!btn) return;

      const id = btn.closest(".card").getAttribute("id");

      let parent = btn.closest(".feed");
      if (parent) return handler(id, "feed");

      parent = btn.closest(".results");
      if (parent) return handler(id, "results");

      parent = btn.closest(".profile");
      if (parent) return handler(id, "profile");

      parent = btn.closest(".bookmarks");
      if (parent) return handler(id, "bookmarks");
    });
  }

  addHandlerDownload(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".photo__download");
      if (!btn) return;

      const id = btn.closest(".card").getAttribute("id");
      handler(id);
    });
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
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

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div class="error__icon">
          <ion-icon name="warning-outline"></ion-icon>
        </div>
        <div class="error__message">${message}</div>
      </div>
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
