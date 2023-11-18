import View from "./View.js";

class StatisticsView extends View {
  _parentElement = document.querySelector(".statistics-container");
  _errorMessage = "Couldn't find that city";
  _data;
  _date = new Date();

  render(data) {
    this._data = data;
    const markup = this._createMarkup();
    console.log(this._data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    document.querySelector(
      ".icon-deg"
    ).style.transform = `rotate(-${this._data.wind.deg}deg)`; //verificar
    document.querySelector(
      ".total-percent"
    ).style.width = `${this._data.main.humidity}%`;
  }

  _createMarkup() {
    const windDeg = this._data.wind.deg;

    return `
      <p class="title-hightlights">Today’s Hightlights</p>

      <div class="first-row">
        <div class="today-status">
          <p class="title-status">Wind status</p>
          <p class="wind-status">${(this._data.wind.speed * 2.237).toFixed(
            1
          )} mph</p>
          <div class="wind-deg">
            <div class="icon-deg">
              <ion-icon name="navigate"></ion-icon>
            </div>
            <p class="wind-direction">${
              windDeg === 0
                ? "N"
                : windDeg >= 22.5 && windDeg < 45
                ? "NNE"
                : windDeg >= 45 && windDeg < 67.5
                ? "NE"
                : windDeg >= 67.5 && windDeg < 90
                ? "ENE"
                : windDeg >= 90 && windDeg < 112.5
                ? "E"
                : windDeg >= 112.5 && windDeg < 135
                ? "ESE"
                : windDeg >= 135 && windDeg < 157.5
                ? "SE"
                : windDeg >= 157.5 && windDeg < 180
                ? "SSE"
                : windDeg >= 180 && windDeg < 202.5
                ? "S"
                : windDeg >= 202.5 && windDeg < 225
                ? "SSW"
                : windDeg >= 225 && windDeg < 247.5
                ? "SW"
                : windDeg >= 247.5 && windDeg < 270
                ? "WSW"
                : windDeg >= 270 && windDeg < 292.5
                ? "W"
                : windDeg >= 292.5 && windDeg < 315
                ? "WNW"
                : windDeg >= 315 && windDeg < 337.5
                ? "NW"
                : windDeg >= 337.5 && windDeg < 360
                ? "NNW"
                : "N"
            }</p>
          </div>
        </div>
        <div class="today-status">
            <p class="title-status">Humidity</p>
            <p class="humidity-status">${this._data.main.humidity}%</p>
          <div class="percentage-num">
            <p>0</p>
            <p>50</p>
            <p>100</p>
          </div>
          <div class="percentage">
            <div class="total-percent"></div>
            <p>%</p>
          </div>
        </div>
      </div>
      <div class="second-row">
        <div class="today-status">
          <p class="title-status">Visibility</p>
          <p class="visibility-status">${Math.round(
            this._data.visibility / 1609
          )} miles</p>
        </div>
        <div class="today-status">
            <p class="title-status">Air Pressure</p>
            <p class="air-pressure-status">${this._data.main.pressure} mb</p>
        </div>
      </div>
    `;
  }
}

export default new StatisticsView();
