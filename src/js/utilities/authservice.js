export const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
};

export const headers = {
  Authorization: `Bearer ${config.accessToken}`,
  'X-Api-Key': config.apiKey,
};
