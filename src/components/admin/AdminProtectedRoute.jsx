import { Navigate, Outlet } from 'react-router-dom';
import { getAdminSession } from '../../services/adminAuthService';

export default function AdminProtectedRoute() {
  const session = getAdminSession();

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
