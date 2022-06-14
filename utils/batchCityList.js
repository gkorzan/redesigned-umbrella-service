const batchCityList = (cityList) => {
  const BATCH_SIZE = 20;
  const newCityList = [];
  while (true) {
    if (cityList.length > BATCH_SIZE) {
      const batch = cityList.splice(0, BATCH_SIZE);
      newCityList.push(batch);
      continue;
    }
    if (cityList.length > 0) {
      newCityList.push(cityList);
      break;
    }
    break;
  }
  return newCityList;
};

export { batchCityList };
