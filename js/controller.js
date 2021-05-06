import * as model from "./model.js";
import feedView from "./views/feedView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";

const controlRandomPhotos = async function () {
  try {
    feedView.switchView();
    feedView.renderSpinner();
    await model.getRandomPhotos();
    feedView.render(model.state.random);
    paginationView.showPagination();
    paginationView.render("loadmore");
  } catch (err) {
    console.log(err);
  }
};

const controlSearch = async function (query) {
  try {
    paginationView.hidePagination();
    resultsView.switchView();
    searchView.updateHeaderTitle(query);
    resultsView.renderSpinner();
    searchView.hideSearchForm();
    await model.searchPhotos(query);
    resultsView.render(model.state.search.results);
    paginationView.showPagination();
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlNumbersPagination = async function (page) {
  try {
    paginationView.hidePagination();
    resultsView.renderSpinner();
    await model.searchPhotos(model.state.search.query, page);
    resultsView.render(model.state.search.results);
    paginationView.showPagination();
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlLoadmorePagination = async function () {
  try {
    paginationView.renderSpinner();
    await model.getRandomPhotos();
    feedView.update(model.state.random);
    paginationView.render("loadmore");
  } catch (err) {
    console.log(err);
  }
};

const controlBookmark = async function (id, view) {
  try {
    if (view === "feed") feedView.updateBookmark(id);
    if (view === "results") resultsView.updateBookmark(id);
    if (view === "bookmarks") bookmarksView.deleteCard(id);

    await model.switchBookmark(id);
  } catch (err) {
    console.log(err);
  }
};

const controlBookmarkView = function () {
  paginationView.hidePagination();
  bookmarksView.switchView();
  bookmarksView.updateHeaderTitle();
  bookmarksView.renderSpinner();

  setTimeout(function () {
    if (model.state.bookmarks.length !== 0)
      bookmarksView.render(model.state.bookmarks);
    else bookmarksView.renderError();
  }, 500);
};

const controlDownload = function (id) {
  try {
    model.downloadPhoto(id);
  } catch (err) {
    console.log(err);
  }
};

const controlReturnToFeed = function () {
  feedView.switchView();
  feedView.updateHeaderTitle();
  paginationView.showPagination();
};

const init = function () {
  feedView.addHandlerLoad(controlRandomPhotos);
  feedView.addHandlerDownload(controlDownload);
  feedView.addHandlerBookmark(controlBookmark);
  feedView.addHandlerLogo(controlReturnToFeed);

  searchView.addHandlerSearchSubmit(controlSearch);
  resultsView.addHandlerDownload(controlDownload);
  resultsView.addHandlerBookmark(controlBookmark);

  bookmarksView.addHandlerShowBookmarksBtn(controlBookmarkView);
  bookmarksView.addHandlerDownload(controlDownload);
  bookmarksView.addHandlerBookmark(controlBookmark);

  paginationView.addHandlerNumbersPagination(controlNumbersPagination);
  paginationView.addHandlerLoadmorePagination(controlLoadmorePagination);
};

init();
