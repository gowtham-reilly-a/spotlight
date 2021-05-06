import View from "./view.js";

class FeedView extends View {
  _parentElement = document.querySelector(".feed");
  _data;
  _title = "Feed";

  constructor() {
    super();
    this._parentElement.addEventListener("click", this._toggleInfo.bind(this));
  }

  addHandlerLogo(handler) {
    document.getElementById("brand").addEventListener("click", handler);
  }

  addHandlerLoad(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }

  _generateMarkup() {
    return `
    ${this._data
      .map((photo) => {
        return `
        <div class="card" id="${photo.id}">
          <div class="card__header">
            <div class="photographer__details">
              <div class="photographer__pic">
                <img
                  class="card__header--pic"
                  src="${photo.user.profile_image.small}"
                  alt="${photo.alt_description}"
                />
              </div>
              <div class="card__header--meta">
                <div class="photographer__username" data-username="${
                  photo.user.username
                }">${photo.user.username}</div>
                <div class="photo__location">
                  ${photo.location?.title ? photo.location.title : ""}
                </div>
              </div>
            </div>
            <div class="card__info">
              <ion-icon name="information-circle-outline"></ion-icon>
            </div>
          </div>
          <div class="card__body">
            <img
              class="card__body--pic"
              src="${photo.urls.regular}"
              alt="red and black love print ball"
            />
            <div class="card__body--overlay hidden">
              <div class="photographer__profile">
                <div class="photographer__profile--overview">
                  <div class="photographer__profile--pic">
                    <img
                      class="photographer__picture--profile"
                      src="${photo.user.profile_image.medium}"
                      alt="profile picture"
                    />
                  </div>
                  <div class="photographer__profile--stats">
                    <div class="photographer__stats--likes">
                      <div class="photographer__likes--count">${
                        photo.user.total_likes
                      }</div>
                      <div class="photographer__likes--text">Likes</div>
                    </div>
                    <div class="photographer__stats--photos">
                      <div class="photographer__photos--count">${
                        photo.user.total_photos
                      }</div>
                      <div class="photographer__photos--text">Photos</div>
                    </div>
                    <div class="photographer__stats--collections">
                      <div class="photographer__collections--count">${
                        photo.user.total_collections
                      }</div>
                      <div class="photographer__collections--text">
                        Collections
                      </div>
                    </div>
                  </div>
                </div>
                <div class="photographer__profile--title">
                  <div class="photographer__profile--name">
                    ${photo.user.name}
                  </div>
                  <div class="photographer__profile--username">
                    @${photo.user.username}
                  </div>
                </div>
                <div class="photographer__profile--location ${
                  photo.user.location ? "" : "hidden"
                }">
                  <div class="photographer__location--text">
                    ${photo.user.location}
                  </div>
                </div>
                
                <div class="photographer__profile--unsplash">
                  <a
                    href="${photo.user.links.html}"
                    target="_blank"
                    >Photo via Unsplash</a
                  >
                </div>
                <div class="photographer__profile--links">
                  <a target="_blank" href="${
                    photo.user.portfolio_url
                  }" class="photographer__portfolio ${
          photo.user.portfolio_url ? "" : "hidden"
        }"
                    ><ion-icon name="globe-outline"></ion-icon
                  ></a>

                  <a target="_blank" href="https://instagram.com/${
                    photo.user.instagram_username
                  }" class="photographer__instagram ${
          photo.user.instagram_username ? "" : "hidden"
        }"
                    ><ion-icon name="logo-instagram"></ion-icon
                  ></a>

                  <a target="_blank" href="https://twitter.com/${
                    photo.user.twitter_username
                  }" class="photographer__twitter ${
          photo.user.twitter_username ? "" : "hidden"
        }"
                    ><ion-icon name="logo-twitter"></ion-icon
                  ></a>
                </div>
                
              </div>
            </div>
          </div>
          <div class="card__footer">
            <div class="card__action">
              <div class="photo__interaction">
                
                <div class="photo__bookmark">
                  <ion-icon name="bookmark-${
                    photo.bookmark ? "sharp" : "outline"
                  }"></ion-icon>
                </div>
                
              </div>
              <div class="photo__download">
                <ion-icon name="cloud-download-outline"></ion-icon>
              </div>
            </div>
            <div class="card__footer--meta">
              <div class="photo__likes">
                <span class="photo__likes--count">${photo.likes}</span>
                <span class="photo__likes--text">likes</span>
              </div>
              <div class="photographer__name">${photo.user.name}</div>
              <div class="card__description">${
                photo.description ? photo.description : ""
              }</div>
            </div>
          </div>
        </div>
        `;
      })
      .join("")}
      
      `;
  }
}

export default new FeedView();
