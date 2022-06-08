import { sendRequest } from "../middleware/middleware.js";
import { readCityList } from "./readCityList.js";

const fetchWeatherByLocation = async (lat, lon) => {
  if (!lat || !lon) {
    throw Error("fetchWeatherByLocation: wrong arguments");
  }

  const URL = `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`;

  const resp = await sendRequest(URL);
  if (resp.status != 200) {
    return {};
  }

  const weatherInfo = {
    name: resp.data.geo_object.locality.name,
    id: resp.data.geo_object.locality.id,
    geoid: resp.data.info.geoid,
    lat: resp.data.info.lat,
    lon: resp.data.info.lon,
    temp: resp.data.fact.temp,
  };

  return weatherInfo;
};

const fetchWeather = async () => {
  const cityList = await readCityList();
  const cityWeatherList = [];
  for await (const cityWeather of cityList.map((city) =>
    fetchWeatherByLocation(city.lat, city.lon)
  )) {
    cityWeatherList.push(cityWeather);
  }
  return cityWeatherList;
};

export { fetchWeather };
