import { sendRequest } from "../middleware/middleware.js";
import { camelize } from "./camelize.js";
import { readCityList } from "./readCityList.js";

const fetchWeatherByLocation = async (lat, lon) => {
  if (!lat || !lon) {
    throw Error("fetchWeatherByLocation: wrong arguments");
  }

  const URL = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`;

  const resp = await sendRequest(URL);
  if (!resp || resp.status != 200) {
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

const fetchWeather = async () => {
  const cityList = await readCityList();
  // to get weather data for each city asynchronously
  const cityWeatherList = await Promise.all(
    cityList.map(async (city) => {
      const weatherInfo = await fetchWeatherByLocation(city.lat, city.lon);
      return weatherInfo;
    })
  );
  return cityWeatherList;
};

export { fetchWeather };
