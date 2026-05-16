import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  // Check if admin is authenticated (This is a frontend simulation)
  // In production, validate JWT token from cookies/localStorage via a Context or Redux store
  const isAuthenticated = localStorage.getItem('adminToken') !== null;

  if (!isAuthenticated) {
    // Redirect them to the /admin/login page, but save the current location they were trying to go to
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
