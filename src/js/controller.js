import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import feedView from "./views/feedView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import profileView from "./views/profileView.js";
import { async } from "regenerator-runtime/runtime";

const controlRandomPhotos = async function () {
  try {
    feedView.switchView();
    feedView.updateHeaderTitle();
    feedView.renderSpinner();
    await model.getRandomPhotos();
    feedView.render(model.state.random);
    feedView.lazyLoadImages();
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
    resultsView.lazyLoadImages();
    paginationView.showPagination();
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlSearchResults = async function (page) {
  try {
    paginationView.hidePagination();
    resultsView.renderSpinner();
    await model.searchPhotos(model.state.search.query, page);
    resultsView.render(model.state.search.results);
    resultsView.lazyLoadImages();
    paginationView.showPagination();
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlFeedUpdate = async function (parent) {
  try {
    if (parent !== "feed") return;

    paginationView.renderSpinner();
    await model.getRandomPhotos();
    feedView.update(model.state.random);
    feedView.lazyLoadImages();
    paginationView.render("loadmore");
  } catch (err) {
    console.log(err);
  }
};

const controlBookmark = async function (id, view) {
  try {
    if (view === "feed") feedView.updateBookmark(id);
    if (view === "results") resultsView.updateBookmark(id);
    if (view === "profile") profileView.updateBookmark(id);
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
    if (model.state.bookmarks.length !== 0) {
      bookmarksView.render(model.state.bookmarks);
      bookmarksView.lazyLoadImages();
    } else bookmarksView.renderError();
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
  paginationView.render("loadmore");
};

const controlPhotographerProfile = async function (username) {
  try {
    profileView.switchView();
    profileView.updateHeaderTitle();
    profileView.renderSpinner();
    paginationView.hidePagination();
    await model.getPhotographerProfile(username);
    profileView.render(model.state.photographer);
    profileView.lazyLoadImages();

    if (
      model.state.photographer.curPage <= model.state.photographer.totalPages
    ) {
      paginationView.showPagination();
      paginationView.render("loadmore");
    } else paginationView.hidePagination();
  } catch (err) {
    console.log(err);
  }
};

const controlPhotographerPhotos = async function (parent) {
  try {
    if (parent !== "profile") return;

    paginationView.renderSpinner();
    await model.getPhotographerPhotos();
    profileView.updatePhotos(model.state.photographer.photos);
    profileView.lazyLoadImages();

    if (model.state.photographer.curPage <= model.state.photographer.totalPages)
      paginationView.render("loadmore");
    else paginationView.hidePagination();
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  feedView.addHandlerLoad(controlRandomPhotos);
  feedView.addHandlerDownload(controlDownload);
  feedView.addHandlerBookmark(controlBookmark);
  feedView.addHandlerLogo(controlReturnToFeed);
  feedView.addHandlerUsername(controlPhotographerProfile);

  profileView.addHandlerUsername(controlPhotographerProfile);
  profileView.addHandlerDownload(controlDownload);
  profileView.addHandlerBookmark(controlBookmark);

  searchView.addHandlerSearchSubmit(controlSearch);
  resultsView.addHandlerDownload(controlDownload);
  resultsView.addHandlerBookmark(controlBookmark);
  resultsView.addHandlerUsername(controlPhotographerProfile);

  bookmarksView.addHandlerShowBookmarksBtn(controlBookmarkView);
  bookmarksView.addHandlerDownload(controlDownload);
  bookmarksView.addHandlerBookmark(controlBookmark);
  bookmarksView.addHandlerUsername(controlPhotographerProfile);

  paginationView.addHandlerNumbersPagination(controlSearchResults);
  paginationView.addHandlerLoadmorePagination(controlFeedUpdate);
  paginationView.addHandlerLoadmorePagination(controlPhotographerPhotos);
};

init();
