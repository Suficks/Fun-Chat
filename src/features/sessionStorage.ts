export const getDataFromSessionStorage = (key: string) => {
  const result = sessionStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export const setDataToSessionStorage = <T>(key: string, value: T) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
