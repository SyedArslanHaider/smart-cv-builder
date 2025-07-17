const validateApiKey = (key, provider) => {
  const trimmedKey = key.trim();
  if (!trimmedKey || !provider) return false;
  switch (provider) {
    case 'Gemini':
      return /^AIza[0-9A-Za-z-_]{35}$/.test(trimmedKey);

    case 'OpenAI':
      return /^sk-([a-zA-Z0-9-_]){20,}$/.test(trimmedKey);

    case 'Claude':
      return /^sk-ant-[a-zA-Z0-9]{40,}$/.test(trimmedKey);

    default:
      return false;
  }
};
export default validateApiKey;
