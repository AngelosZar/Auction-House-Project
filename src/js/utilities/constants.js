export const API_BASE = 'https://v2.api.noroff.dev';

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_READ_PROFILES = `${API_BASE}/auction/profiles`;

export const API_KEY = localStorage.getItem('apiKey') || 'b8ccaf6e-4043-4f1e-bd7e-a02728a0f022';
