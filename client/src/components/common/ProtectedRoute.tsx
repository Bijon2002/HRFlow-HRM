import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('hrflow_token');
  const userJson = localStorage.getItem('hrflow_user');
  let user: { role: string } | null = null;

  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch (e) {
      user = null;
    }
  }

  // Not authenticated
  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Role not authorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
