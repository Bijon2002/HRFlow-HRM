const API_URL = 'http://localhost:5000/api';

export const getAuthToken = () => {
  return localStorage.getItem('hrflow_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('hrflow_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('hrflow_token');
  localStorage.removeItem('hrflow_current_role');
  localStorage.removeItem('hrflow_user');
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

export const api = {
  get: (endpoint: string, options?: RequestInit) => apiFetch(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, body: any, options?: RequestInit) => apiFetch(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  }),
  put: (endpoint: string, body: any, options?: RequestInit) => apiFetch(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  }),
  delete: (endpoint: string, options?: RequestInit) => apiFetch(endpoint, { ...options, method: 'DELETE' }),
};
