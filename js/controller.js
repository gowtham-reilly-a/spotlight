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
  resultsView.switchView();
  searchView.updateHeaderTitle(query);
  resultsView.renderSpinner();
  searchView.hideSearchForm();
  await model.searchPhotos(query);
  resultsView.render(model.state.search.results);
};

const controlRandomPhotos = async function () {
  feedView.switchView();
  feedView.renderSpinner();
  await model.getRandomPhotos();
  feedView.render(model.state.random);
};

const controlPhotosList = async function () {
  feedView.switchView();
  feedView.renderSpinner();
  await model.getPhotosList();
  feedView.render(model.state.photos);
};

const controlDownload = async function (id) {
  await model.downloadPhoto(id);
};

const init = function () {
  searchView.addHandlerSearchSubmit(controlSearch);
  resultsView.addHandlerDownload(controlDownload);
  feedView.addHandlerDownload(controlDownload);
  feedView.addHandlerLoad(controlRandomPhotos);
};

init();
