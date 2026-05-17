import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logoutAdmin } from '../../services/adminAuthService';

export default function AdminLogout() {
  useEffect(() => {
    logoutAdmin();
  }, []);

  return <Navigate to="/admin/login" replace />;
}


