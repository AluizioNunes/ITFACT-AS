import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function RequireAuth() {
  const location = useLocation()
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}
