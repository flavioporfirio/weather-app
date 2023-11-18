"use strict";

const getAPIData = async function () {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    return data.apiKey;
  } catch (err) {
    console.error(err.message);
  }
};

//Current weather elements
const currTempMax = document.querySelector(".curr-temp_max");
const currStatus = document.querySelector(".curr-status");
const currImgStatus = document.querySelector(".status-img");
const currDate = document.querySelector(".curr-date");
const currLocation = document.querySelector(".curr-location");

//containers
const forecastContainer = document.querySelector(".forecast-container");
const searchContainer = document.querySelector(".search-container");
const currentWeather = document.querySelector(".current-box");

//current weather status elements
const firstRow = document.querySelector(".first-row");
const secondRow = document.querySelector(".second-row");

const windStatus = document.querySelector(".wind-status");
const iconDeg = document.querySelector(".icon-deg");
const windDirection = document.querySelector(".wind-direction");

const humidityStatus = document.querySelector(".humidity-status");
const totalPercentage = document.querySelector(".total-percent");

const visibilityStatus = document.querySelector(".visibility-status");
const airPressureStatus = document.querySelector(".air-pressure-status");

const searchInput = document.querySelector(".search-input");
const cityList = document.querySelector(".city-list");

//Buttons
const btnSearch = document.querySelector(".btn-search");
const btnStartSearch = document.querySelector(".btn-start-search");
const closeSearch = document.querySelector(".close-search");
const btnCelsius = document.querySelector(".btn-celsius");
const btnFahrenheit = document.querySelector(".btn-fahrenheit");

let date = new Date();
let liLocation,
  liEl = [];
let lat = -23.5427842;
let lon = -46.3108391;

iconDeg.style.transform = "rotate(45deg)";

const kelvinToCelsius = function (temp) {
  return temp - 273.15;
};

const kelvinToFahrenheit = function (temp) {
  return (temp - 273.15) * 1.8 + 32;
};

const renderCurrError = function (msg) {
  currStatus.innerHTML = msg.message;
  forecastContainer.innerHTML = msg.message;
};

const renderForecastErr = function (msg) {
  firstRow.innerHTML = msg.message;
  secondRow.innerHTML = msg.message;
};

const renderForecastBox = function (
  forecastEachDay = [],
  date,
  i,
  fahrenheit = false
) {
  const tempMax = forecastEachDay[i]?.main.temp_max;
  const tempMin = forecastEachDay[i]?.main.temp_min;
  let day =
    calcDayPassed(date, new Date(forecastEachDay[i].dt * 1000)) === 1
      ? "Tomorrow"
      : new Date(forecastEachDay[i].dt * 1000);

  const html = `
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
    forecastEachDay[i]?.weather[0].icon
  }@2x.png" alt=${forecastEachDay[i]?.weather[0].description} />
  <div class="temp-max-min">
    <p>${
      fahrenheit === false
        ? Math.round(kelvinToCelsius(tempMax))
        : Math.round(kelvinToFahrenheit(tempMax))
    }${fahrenheit === false ? "℃" : "℉"}</p>
    <p><span>${
      fahrenheit === false
        ? Math.round(kelvinToCelsius(tempMin))
        : Math.round(kelvinToFahrenheit(tempMin))
    }${fahrenheit === false ? "℃" : "℉"}</span></p>
  </div>
</div>

`;
  return html;
};

const calcDayPassed = function (date1, date2) {
  return Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24))) + 1;
};

const getCountryData = async function () {
  try {
    const countryResponse = await fetch(
      `https://geocode.maps.co/search?q=${liLocation}`
    );
    const countryData = await countryResponse.json();
    return countryData;
  } catch (err) {
    renderCurrError(err);
    renderForecastErr(err);
    btnFahrenheit.remove();
    btnCelsius.remove();
  }
};

const getCurrentData = async function (lat = -23.5427842, lon = -46.3108391) {
  try {
    const apiKey = await getAPIData();
    let currentRes;
    if (lat === -23.5427842 && lon === -46.3108391)
      currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

    currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const currentData = await currentRes.json();
    return currentData;
  } catch (err) {
    renderCurrError(err);
  }
};

const renderCurrData = async function (
  lat = -23.5427842,
  lon = -46.3108391,
  searchLocation = false
) {
  let currentData;

  if (searchLocation == false) currentData = await getCurrentData(lat, lon);
  else currentData = await getCurrentData(lat, lon);

  const windDeg = currentData.wind.deg;

  currTempMax.innerHTML = `${Math.round(
    kelvinToCelsius(currentData.main.temp_max)
  )}<span>℃</span>`;

  currStatus.innerHTML = currentData.weather[0].main;

  currImgStatus.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

  currImgStatus.alt = currentData.weather[0].description;

  currDate.innerHTML = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);

  currLocation.innerHTML = currentData.name;

  windStatus.innerHTML = `${Math.round(
    currentData.wind.speed * 2.237
  )} <p>mph</p>`;
  iconDeg.style.transform = `rotate(-${windDeg}deg)`;
  windDirection.innerHTML =
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
      : "N";

  humidityStatus.innerHTML = `${currentData.main.humidity}<p>%</p>`;
  totalPercentage.style.width = `${currentData.main.humidity}%`;

  visibilityStatus.innerHTML = `${Math.round(
    currentData.visibility / 1609
  )} <p>miles</p>`;
  airPressureStatus.innerHTML = `${currentData.main.pressure} <p>mb</p>`;
};

const getForecastData = async function (lat = -23.5427842, lon = -46.3108391) {
  try {
    let forecastRes;
    const apiKey = await getAPIData();
    if (lat === -23.5427842 && lon === -46.3108391)
      forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

    forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();

    return forecastData;
  } catch (err) {
    renderForecastErr(err);
  }
};

const renderForecastData = async function (
  lat = -23.5427842,
  lon = -46.3108391,
  searchLocation = false
) {
  let forecastData, html;
  if (searchLocation == false) forecastData = await getForecastData();
  else forecastData = await getForecastData(lat, lon);

  for (let i = 1; i < forecastData.list.length; i += 9) {
    html = renderForecastBox(forecastData.list, date, i);

    forecastContainer.insertAdjacentHTML("beforeend", html);
  }
};

renderCurrData();
renderForecastData();

btnSearch.addEventListener("click", function () {
  searchContainer.style.display = "block";
  currentWeather.style.display = "none";
});

closeSearch.addEventListener("click", function () {
  searchContainer.style.display = "none";
  currentWeather.style.display = "block";
});

const startSearch = function (e) {
  if (searchInput.value === "") return;

  const html = ` <li>${searchInput.value} <ion-icon name="chevron-forward-outline"></ion-icon></li>`;
  searchInput.value = "";

  cityList.insertAdjacentHTML("beforeend", html);

  liEl = document.querySelectorAll("li");

  liEl.forEach((li) =>
    li.addEventListener("click", async function () {
      let fowardData;

      searchContainer.style.display = "none";
      currentWeather.style.display = "block";

      liLocation = li.textContent;
      liEl = "";
      fowardData = await getCountryData();

      renderCurrData(fowardData[0]?.lat, fowardData[0]?.lon, true);

      renderForecastData(fowardData[0]?.lat, fowardData[0]?.lon, true);

      const forecastBoxes = document.querySelectorAll(".forecast-boxes");
      forecastBoxes.forEach((forecastBox) => forecastBox.remove());

      fowardData = await getCountryData();
      lat = fowardData[0]?.lat;
      lon = fowardData[0]?.lon;
    })
  );
};

btnStartSearch.addEventListener("click", startSearch);
// btnStartSearch.addEventListener("keydown", startSearch);

const transformToCelsius = async function (
  lat = -23.5427842,
  lon = -46.3108391,
  searchLocation = false
) {
  let currData, data, html;
  if (searchLocation == true) {
    currData = await getCurrentData(lat, lon);
    data = await getForecastData(lat, lon);
  } else {
    currData = await getCurrentData();
    data = await getForecastData();
  }

  const forecastBoxes = document.querySelectorAll(".forecast-boxes");
  forecastBoxes.forEach((forecastBox) => forecastBox.remove());

  forecastBoxes.forEach((forecastBox) => forecastBox.remove());

  currTempMax.innerHTML = `${Math.round(
    kelvinToCelsius(currData.main.temp_max)
  )}<span>℃</span>`;

  for (let i = 1; i < data.list.length; i += 9) {
    html = renderForecastBox(data.list, date, i);

    forecastContainer.insertAdjacentHTML("beforeend", html);
  }
};

const transformToFahrenheit = async function (
  lat = -23.5427842,
  lon = -46.3108391,
  searchLocation = false
) {
  let currData, data, html;

  if (searchLocation == true) {
    currData = await getCurrentData(lat, lon);
    data = await getForecastData(lat, lon);
  } else {
    currData = await getCurrentData();
    data = await getForecastData();
  }

  const forecastBoxes = document.querySelectorAll(".forecast-boxes");
  forecastBoxes.forEach((forecastBox) => forecastBox.remove());

  currTempMax.innerHTML = `${Math.round(
    kelvinToFahrenheit(currData.main.temp_max)
  )}<span>℉</span>`;

  for (let i = 1; i < data.list.length; i += 9) {
    html = renderForecastBox(data.list, date, i, true);

    forecastContainer.insertAdjacentHTML("beforeend", html);
  }
};

btnCelsius.addEventListener("click", async function () {
  transformToCelsius(lat, lon, true);
});

btnFahrenheit.addEventListener("click", async function () {
  transformToFahrenheit(lat, lon, true);
});
