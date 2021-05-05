import { async } from "regenerator-runtime";
import { createApi } from "unsplash-js";
import { ACCESS_KEY, START_PAGE } from "./config.js";

export const state = {
  photographer: "",
  photo: {},
  photos: [],
  random: [],
  search: {
    query: "",
    results: [],
    curPage: START_PAGE,
    totalPages: 0,
  },
  bookmarks: [],
};

const unsplash = createApi({
  accessKey: ACCESS_KEY,
});

export const loadPhoto = async function (id) {
  try {
    const res = await unsplash.photos.get({
      photoId: id,
    });
    state.photo = res.response;
  } catch (err) {
    console.log(err);
  }
};

export const getRandomPhotos = async function () {
  try {
    const res = await unsplash.photos.getRandom({
      count: 50,
    });

    state.random = res.response.map((photo) => {
      const bookmark = state.bookmarks.some(
        (bookmark) => bookmark.id === photo.id
      );
      return {
        ...photo,
        bookmark,
      };
    });

    state.photos.push(...state.random);
  } catch (err) {
    throw err;
  }
};

export const searchPhotos = async function (query, page = START_PAGE) {
  try {
    const res = await unsplash.search.getPhotos({
      query,
      page,
      perPage: 30,
    });

    const { response } = res;

    if (response.results.length === 0) throw new Error();

    state.search.results = response.results.map((photo) => {
      const bookmark = state.bookmarks.some(
        (bookmark) => bookmark.id === photo.id
      );
      return {
        ...photo,
        bookmark,
      };
    });

    state.search.totalPages = response.total_pages;
    state.search.query = query;
    state.search.curPage = page;

    state.photos.push(...state.search.results);
  } catch (err) {
    throw err;
  }
};

export const downloadPhoto = async function (id) {
  try {
    const res = await unsplash.photos.get({
      photoId: id,
    });

    const photo = res.response;

    // Trigger download
    const source = photo.urls.full;
    // ReadableStream data of image
    const image = await fetch(source);
    // Raw image data
    const data = await image.blob();
    // URL that represents the image's download URL
    const imageURL = URL.createObjectURL(data);

    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;

    downloadLink.download = `spotlight_${
      photo.alt_description ? photo.alt_description : ""
    }${photo.id}_unsplash`;

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    // Track download
    unsplash.photos.trackDownload({
      downloadLocation: photo.links.download_location,
    });
  } catch (err) {
    throw err;
  }
};

const localStorageBookmarks = function () {
  localStorage.setItem("spotlight_bookmarks", JSON.stringify(state.bookmarks));
};

const addBookmark = async function (id) {
  try {
    const photo = state.photos.find((photo) => photo.id === id);

    if (photo) {
      photo.bookmark = true;
      state.bookmarks.push(photo);
    } else {
      console.log("foriegn");
      await loadPhoto(id);
      state.photo.bookmark = true;
      state.bookmarks.push(state.photo);
    }

    localStorageBookmarks();
  } catch (err) {
    throw err;
  }
};

const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  state.bookmarks.splice(index, 1);
  localStorageBookmarks();
};

export const switchBookmark = async function (id) {
  try {
    const status = state.bookmarks.some((bookmark) => bookmark.id === id);

    if (status) removeBookmark(id);
    else addBookmark(id);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const data = JSON.parse(localStorage.getItem("spotlight_bookmarks"));
  if (data) state.bookmarks = data;
};

init();
