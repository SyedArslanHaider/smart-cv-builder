export const STORAGE_KEY = 'cvFormData';

export const getFormData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return {};

    return {
      ...data,
      education: Array.isArray(data.education) ? data.education : [],
      projects: Array.isArray(data.projects) ? data.projects : [],
    };
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return {};
  }
};

export const saveFormData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
