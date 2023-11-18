class currentView {
  _parentElement = document.querySelector(".current-container");
  _errorMessage = "Couldn't find that city";
  _data;
  _date = new Date();

  render(data, units = "metric") {
    this._data = data;
    const markup = this._createMarkup(units);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _createMarkup(units) {
    return `
      <div class="weather-img">
        <img src="https://openweathermap.org/img/wn/${
          this._data.weather[0].icon
        }@2x.png" alt="${
      this._data.weather[0].description
    }" class="status-img" />
      </div>
      <div class="current-temp">
        <p class="curr-temp_max">${this._data.main.temp.toFixed()}<span>${
      units === "metric" ? "℃" : "℉"
    }</span></p>
      </div>
      <div class="weather-status">
        <p class="curr-status">${this._data.weather[0].description}</p>
      </div>
      <div class="curr-weather-date">
        <p>Today</p>
        <p>•</p>
        <p class="curr-date">${new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(this._date)}</p>
      </div>
      <div class="curr-city">
        <span class="material-symbols-outlined"> location_on </span>
        <p class="curr-location">${this._data.name}</p>
      </div>
    `;
  }
}

export default new currentView();
