import { sendRequest } from "../middleware/middleware.js";
import { camelize } from "./camelize.js";
import { readCityList } from "./readCityList.js";
import { batchCityList } from "./batchCityList.js";

const fetchWeatherByLocation = async (lat, lon) => {
  if (lat === undefined || lon === undefined) {
    throw Error("fetchWeatherByLocation: wrong arguments");
  }

  const URL = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`;

  const resp = await sendRequest(URL);
  if (!resp || resp.status != 200) {
    return {};
  }
  if (!resp.data.geo_object.locality) {
    return {};
  }

  const weatherInfo = {
    name: resp.data.geo_object.locality.name,
    id: resp.data.geo_object.locality.id,
    geoid: resp.data.info.geoid,
    lat: resp.data.info.lat,
    lon: resp.data.info.lon,
    temp: resp.data.fact.temp,
    feelsLike: resp.data.fact.feels_like,
    pressureMm: resp.data.fact.pressure_mm,
    humidity: resp.data.fact.humidity,
    imgUrl: `https://yastatic.net/weather/i/icons/funky/dark/${resp.data.fact.icon}.svg`,
    condition: camelize(resp.data.fact.condition),
  };

  return weatherInfo;
};

const fetchWeatherByCityList = async (cityList) => {
  // to get weather data for each city asynchronously
  let cityWeatherList = await Promise.all(
    cityList.map(async (city) => {
      const weatherInfo = await fetchWeatherByLocation(city.lat, city.lon);
      return weatherInfo;
    })
  );
  return cityWeatherList;
};

const fetchWeather = async () => {
  const bigCityList = await readCityList("../data/Xbig_cities.json");
  const blrCityList = await readCityList("../data/Xblr_cities.json");
  const formCityList = await readCityList("../data/form_cities.json");

  const cityList = [...bigCityList, ...blrCityList, ...formCityList];

  const batchedCityList = batchCityList(cityList);

  const weather = [];

  for (const batch of batchedCityList) {
    const weatherBatch = await fetchWeatherByCityList(batch);
    weather.push(...weatherBatch);
  }

  return weather.filter((element) => Object.keys(element).length !== 0);
};

export { fetchWeather };
