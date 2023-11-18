class ForecastView {
  _parentElement = document.querySelector(".forecast-container");
  _errorMessage = "Couldn't find that city";
  _data;
  _date = new Date();

  _btnCelsius = document.querySelector(".btn-celsius");
  _btnFahrenheit = document.querySelector(".btn-fahrenheit");

  render(data, units) {
    this._data = data;
    const markup = this._createMarkup(units);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _calcDayPassed(date1, date2) {
    return Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24))) + 1;
  }

  _celsiusToFahrenheit(temp) {
    return (temp * 1.8 + 32).toFixed();
  }

  _fahrenheitToCelsius(temp) {
    return ((temp - 32) * 1.8).toFixed();
  }

  // handleBtnCelsius(handler) {
  //   this._btnCelsius.addEventListener("click", handler);
  // }

  _createMarkup(units) {
    let markup = "";
    console.log(this._data);
    this._data.forEach((box) => {
      let day =
        this._calcDayPassed(this._date, new Date(box.dt * 1000)) === 1
          ? "Tomorrow"
          : new Date(box.dt * 1000);

      const tempMax = (box?.main.temp_max).toFixed();
      const tempMin = (box?.main.temp_min).toFixed();

      markup += `
          <div class="forecast-boxes">
          <p>${
            day === "Tomorrow"
              ? day
              : new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(day)
          }</p>
          <img src="https://openweathermap.org/img/wn/${
            box?.weather[0].icon
          }@2x.png" alt=${box?.weather[0].description} />
          <div class="temp-max-min">
            <p>${tempMax} <span>${
        units === "metric" ? "℃" : "℉"
      }</span></p>
            <p>${tempMin} <span>${
        units === "metric" ? "℃" : "℉"
      }</span></p>
          </div>
        </div>
        `;
    });
    return markup;
  }
}

export default new ForecastView();
