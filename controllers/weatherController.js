import { Router } from "express";
import { fetchWeather } from "../utils/fetchWeather.js";
import { cache } from "../middleware/middleware.js";

const router = Router();

const cacheTime = 60 * 60;

router.get("/weather", cache(cacheTime), async (req, res) => {
  const cityWeatherList = await fetchWeather();
  console.log(cityWeatherList);
  res.send(cityWeatherList);
});

export { router };
