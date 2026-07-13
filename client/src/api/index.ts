const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  // Only set Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 401 Unauthorized — token expired or invalid → auto-logout
  if (response.status === 401) {
    removeAuthToken();
    window.location.href = '/auth/login';
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

export const api = {
  get: (endpoint: string, options?: RequestInit) => apiFetch(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, body: any, options?: RequestInit) => {
    // Support FormData for file uploads
    if (body instanceof FormData) {
      return apiFetch(endpoint, { ...options, method: 'POST', body });
    }
    return apiFetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  put: (endpoint: string, body: any, options?: RequestInit) => apiFetch(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  }),
  delete: (endpoint: string, options?: RequestInit) => apiFetch(endpoint, { ...options, method: 'DELETE' }),
};
