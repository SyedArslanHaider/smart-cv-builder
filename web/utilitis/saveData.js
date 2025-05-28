export const STORAGE_KEY = 'cvFormData';

export const getFormData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
};

export const saveFormData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
