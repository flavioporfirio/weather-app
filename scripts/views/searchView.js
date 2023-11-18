let city;

class StatisticsView {
  _parentElement = document.querySelector(".search-container");
  _listElement = document.querySelector(".city-list");
  _errorMessage = "Couldn't find that city";
  _data;
  _date = new Date();
  _city;

  _render() {
    const markup = this._createLineMarkup();

    this._listElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  handleSearchBtn(handler) {
    document
      .querySelector(".btn-search")
      .addEventListener("click", function () {
        handler();
      });
  }

  handleBtnFahrenheit(handler) {
    document
      .querySelector(".btn-fahrenheit")
      .addEventListener("click", function () {
        console.log(city);
        handler(city, "imperial");
      });
  }

  handleBtnCelsius(handler) {
    document
      .querySelector(".btn-celsius")
      .addEventListener("click", function () {
        console.log(city);
        handler(city);
      });
  }

  handleStartSearch() {
    document
      .querySelector(".btn-start-search")
      .addEventListener("click", this._render.bind(this));
  }

  handleListSearch(handler) {
    this._listElement.addEventListener("click", function (e) {
      if (!e.target.closest(".city-name")) return;

      city = e.target.innerHTML.trim();
      console.log(city);
      handler(e.target.innerHTML);
    });
  }

  handleCloseSearchBtn(handler) {
    document
      .querySelector(".close-search")
      .addEventListener("click", function () {
        handler();
      });
  }

  _createLineMarkup() {
    const input = document.querySelector(".search-input");

    return `
      <li class="city-name">
        ${input.value}
      </li>
    `;
  }
}

export default new StatisticsView();

/*
      <li>
        <p class="city-name">${input.value}</p>
        <ion-icon       name="chevron-forward-outline"></ion-icon>
      </li>

*/
