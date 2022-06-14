import { readFile } from "fs/promises";

const readCityList = async (path) => {
  try {
    const json = JSON.parse(await readFile(new URL(path, import.meta.url)));
    return json;
  } catch (_) {
    return [];
  }
};

export { readCityList };
