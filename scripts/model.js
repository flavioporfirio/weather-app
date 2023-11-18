import { API_KEY } from "./config.js";

export const state = {
  forecast: [],
  current: {},
};

export const searchForecastData = async function (city, units = "metric") {
  try {
    if (city === "") throw new Error("Invalid city");
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${API_KEY}`
    );

    console.log(res.url);

    const { list } = await res.json();
    console.log(list);
    // Talvez fazer um Promise.race() depois
    for (let i = 0; i < 40; i += 8) {
      state.forecast.push(list[i]);
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchCurrData = async function (city, units = "metric") {
  try {
    if (city === "") throw new Error("Invalid city");
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );

    const data = await res.json();
    state.current = data;
  } catch (err) {
    console.log(err);
  }
};
