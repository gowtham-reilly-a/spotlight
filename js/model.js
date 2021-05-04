import { async } from "regenerator-runtime";
import { createApi } from "unsplash-js";
import { ACCESS_KEY } from "./config.js";

export const state = {
  photographer: "",
  photo: {},
  photos: [],
  random: [],
  search: {
    results: [],
    total: 0,
    totalPages: 0,
  },
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
    console.log(state.photo);
  } catch (err) {
    console.log(err);
  }
};

export const searchPhotos = async function (query) {
  try {
    const res = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10,
    });

    const { response } = res;

    state.search = {
      results: response.results,
      total: response.total,
      totalPages: response.total_pages,
    };
    console.log(state.search);
  } catch (err) {
    console.log(err);
  }
};

export const getRandomPhotos = async function () {
  try {
    const res = await unsplash.photos.getRandom({
      count: 50,
    });

    state.random = res.response;
    console.log(state.random);
  } catch (err) {
    console.error(err);
  }
};

export const getPhotosList = async function () {
  try {
    const res = await unsplash.photos.list({
      perPage: 50,
    });

    state.photos = res.response.results;
    console.log(state.photos);
  } catch (err) {
    console.error(err);
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

    // Create anchor tag
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;

    // Set file name
    downloadLink.download = `spotlight_${
      photo.alt_description ? photo.alt_description : ""
    }${photo.id}_unsplash`;

    // Attach anchor tag to body
    document.body.appendChild(downloadLink);

    // Call anchor tag
    downloadLink.click();

    // Remove anchor tag
    document.body.removeChild(downloadLink);

    // Track download
    unsplash.photos.trackDownload({
      downloadLocation: photo.links.download_location,
    });
  } catch (err) {
    console.error(err);
  }
};
