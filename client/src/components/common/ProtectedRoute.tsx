import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: string[];
}

// Decode JWT payload without a library
const decodeToken = (token: string): { exp?: number; id?: string } | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('hrflow_token');
  const userJson = localStorage.getItem('hrflow_user');
  let user: { role: string } | null = null;

  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch {
      user = null;
    }
  }

  // Not authenticated or no token
  if (!token || !user) {
    // Clean up any stale data
    localStorage.removeItem('hrflow_token');
    localStorage.removeItem('hrflow_user');
    localStorage.removeItem('hrflow_current_role');
    return <Navigate to="/auth/login" replace />;
  }

  // Token expired — auto-logout
  if (isTokenExpired(token)) {
    localStorage.removeItem('hrflow_token');
    localStorage.removeItem('hrflow_user');
    localStorage.removeItem('hrflow_current_role');
    return <Navigate to="/auth/login" replace />;
  }

  // Role not authorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
