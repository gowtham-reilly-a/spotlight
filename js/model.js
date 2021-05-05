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
};

const unsplash = createApi({
  accessKey: ACCESS_KEY,
});

// export const loadPhoto = async function (id) {
//   try {
//     const res = await unsplash.photos.get({
//       photoId: id,
//     });
//     state.photo = res.response;
//     console.log(state.photo);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getPhotosList = async function () {
//   try {
//     const res = await unsplash.photos.list({
//       perPage: 50,
//     });

//     state.photos = res.response.results;
//     console.log(state.photos);
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getRandomPhotos = async function () {
  try {
    const res = await unsplash.photos.getRandom({
      count: 50,
    });

    state.random = res.response;
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

    state.search.results = response.results;
    state.search.totalPages = response.total_pages;
    state.search.query = query;
    state.search.curPage = page;
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
