import { readFile } from "fs/promises";

const readCityList = async (path) => {
  const json = JSON.parse(
    await readFile(new URL(path, import.meta.url))
  );
  return json;
};

export { readCityList };
