import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';      
import { MODULE_ROLES } from './rbac';
import { useAppSelector } from '../store/hooks';

const AuthGuard: React.FC<{ children: React.ReactNode; moduleKey?: string }> = ({ children, moduleKey }) => {
  const location = useLocation();
  const user = useAppSelector((s) => s.auth.user);

  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (moduleKey) {
    const allowed = MODULE_ROLES[moduleKey];
    if (allowed && !allowed.includes(user.role as any) && user.role !== 'TOP_MANAGEMENT') {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return <>{children}</>;
};
export default AuthGuard;
    