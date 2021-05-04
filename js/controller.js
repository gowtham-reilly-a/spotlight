import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import * as model from "./model.js";
import feedView from "./views/feedView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

const controlSinglePhoto = function () {
  model.loadPhoto("tG5pIdfy27c");
};

const controlSearch = async function (query) {
  resultsView.toggleView();
  resultsView.renderSpinner();
  await model.searchPhotos(query);
  searchView.hideSearchForm();
  searchView.updateHeaderTitle(query);
  resultsView.render(model.state.search.results);
};

const controlRandomPhotos = async function () {
  feedView.toggleView();
  feedView.renderSpinner();
  await model.getRandomPhotos();
  feedView.render(model.state.random);
};

const controlPhotosList = async function () {
  feedView.renderSpinner();
  await model.getPhotosList();
  feedView.render(model.state.photos);
};

const controlDownload = async function (id) {
  await model.downloadPhoto(id);
};

const init = function () {
  searchView.addHandlerSearchSubmit(controlSearch);
  feedView.addHandlerDownload(controlDownload);
  // controlPhotosList();
  controlRandomPhotos();
  // controlSinglePhotos();
};

init();

// controlPhotos();
// controlSearch();
