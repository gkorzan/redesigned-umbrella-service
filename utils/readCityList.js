import { readFile } from "fs/promises";

const readCityList = async () => {
  const json = JSON.parse(
    await readFile(new URL("../data/big_cities.json", import.meta.url))
  );
  return json;
};

export { readCityList };
