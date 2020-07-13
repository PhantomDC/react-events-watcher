export const difference = (object, base) => {
  return Object.keys(object).reduce((acc, key) => {
    if (object[key] !== base[key]) {
      acc[key] = object[key];
    }

    return acc;
  }, {});
}