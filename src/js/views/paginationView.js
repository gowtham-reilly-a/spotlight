import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _data;

  showPagination() {
    this._parentElement.classList.remove("hidden");
  }

  hidePagination() {
    this._parentElement.classList.add("hidden");
  }

  addHandlerLoadmorePagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__loadmore");
      if (!btn) return;

      let parent;

      if (!document.querySelector(".feed").classList.contains("hidden"))
        parent = "feed";

      if (!document.querySelector(".profile").classList.contains("hidden"))
        parent = "profile";

      handler(parent);
    });
  }

  addHandlerNumbersPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination__number");
      if (!btn) return;

      const page = +btn.dataset.page;

      handler(page);
    });
  }

  _generateMarkup() {
    if (this._data === "loadmore") {
      return `
        <div class="pagination__loadmore">
          <div class="pagination__icon">
            <ion-icon name="reload-outline"></ion-icon>
          </div>
          <div class="pagination__text">load more</div>
        </div>
        `;
    }

    const curPage = this._data.curPage;
    const totalPages = this._data.totalPages;

    if (curPage === 1 && totalPages > 1) {
      return `
        <div data-page="${
          curPage + 1
        }" class="pagination__next pagination__number">
          <div class="pagination__text">Page ${curPage + 1}</div>
          <div class="pagination__icon">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
        `;
    }

    if (curPage > 1 && curPage < totalPages) {
      return `
        <div data-page="${
          curPage - 1
        }" class="pagination__prev pagination__number">
          <div class="pagination__icon">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div class="pagination__text">Page ${curPage - 1}</div>
        </div>

        <div data-page="${
          curPage + 1
        }" class="pagination__next pagination__number">
          <div class="pagination__text">Page ${curPage + 1}</div>
          <div class="pagination__icon">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
        `;
    }

    if (curPage === totalPages && totalPages > 1) {
      return `
        <div data-page="${
          curPage - 1
        }" class="pagination__prev pagination__number">
          <div class="pagination__icon">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div class="pagination__text">Page ${curPage - 1}</div>
        </div>
        `;
    }

    return "";
  }
}

export default new PaginationView();
