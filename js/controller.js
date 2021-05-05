import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";
import * as model from "./model.js";
import feedView from "./views/feedView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

// const controlSinglePhoto = function () {
//   model.loadPhoto("tG5pIdfy27c");
// };

// const controlPhotosList = async function () {
//   feedView.switchView();
//   feedView.renderSpinner();
//   await model.getPhotosList();
//   feedView.render(model.state.photos);
//   paginationView.showPagination();
//   paginationView.render(model.state.photos);
// };

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
    console.log(err);
  }
};

const controlNumbersPagination = async function (page) {
  try {
    resultsView.renderSpinner();
    await model.searchPhotos(model.state.search.query, page);
    resultsView.render(model.state.search.results);
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

const controlDownload = async function (id) {
  try {
    await model.downloadPhoto(id);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  feedView.addHandlerDownload(controlDownload);
  feedView.addHandlerLoad(controlRandomPhotos);
  searchView.addHandlerSearchSubmit(controlSearch);
  resultsView.addHandlerDownload(controlDownload);
  paginationView.addHandlerNumbersPagination(controlNumbersPagination);
  paginationView.addHandlerLoadmorePagination(controlLoadmorePagination);
};

init();
