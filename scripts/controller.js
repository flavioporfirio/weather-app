import * as model from "./model.js";
import currentView from "./views/currentView.js";
import forecastView from "./views/forecastView.js";
import searchView from "./views/searchView.js";
import statisticsView from "./views/statisticsView.js";

const controlCurrWeather = async function (city, units = "metric") {
  await model.searchCurrData(city, units);

  currentView.render(model.state.current, units);

  console.log(model.state.current);
};

const controlForecastWeather = async function (city, units = "metric") {
  await model.searchForecastData(city, units);

  forecastView.render(model.state.forecast, units);
  model.state.forecast = [];
};

const controlCurrStatistics = async function (city) {
  await model.searchCurrData(city);

  statisticsView.render(model.state.current);
};

const initData = function (value) {
  controlCurrWeather(value);
  controlForecastWeather(value);
  controlCurrStatistics(value);

  toggleToSearch();
};

const toggleToSearch = function () {
  document.querySelector(".search-container").classList.toggle("hidden");
  document.querySelector(".current-weather").classList.toggle("hidden");
};

const init = function () {
  searchView.handleSearchBtn(toggleToSearch);
  searchView.handleCloseSearchBtn(toggleToSearch);
  searchView.handleStartSearch();
  searchView.handleListSearch(initData);

  searchView.handleBtnCelsius(controlForecastWeather);
  searchView.handleBtnCelsius(controlCurrWeather);
  searchView.handleBtnFahrenheit(controlForecastWeather);
  searchView.handleBtnFahrenheit(controlCurrWeather);

  // forecastView.handleBtnFahrenheit(model.state.forecast);
};

init();
