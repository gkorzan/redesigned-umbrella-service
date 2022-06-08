import axios from "axios";
import mcache from "memory-cache";
const { request } = axios;

const sendRequest = (url, method, body) => {
  if (!url) {
    throw Error("sendRequest: Invalid URL");
  }
  const options = {
    url,
    method: method ? method : "GET",
    headers: { "X-Yandex-API-Key": process.env.API_KEY },
    data: body ? body : null,
  };
  return request(options);
};

const cache = (durationInSeconds) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponce = res.send;
      res.send = (body) => {
        mcache.put(key, body, durationInSeconds * 1000);
        res.sendResponce(body);
      };
      next();
    }
  };
};

export { sendRequest, cache };
