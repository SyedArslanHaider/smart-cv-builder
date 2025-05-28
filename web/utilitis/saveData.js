export const STORAGE_KEY = 'cvFormData';

export const getFormData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

export const saveFormData = (newData) => {
  const existing = getFormData();
  const updated = { ...existing, ...newData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
