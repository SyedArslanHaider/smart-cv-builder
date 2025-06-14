export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const validateApiKey = (key) => {
  const trimmedKey = key.trim();
  return /^AIza[0-9A-Za-z-_]{35}$/.test(trimmedKey);
};
