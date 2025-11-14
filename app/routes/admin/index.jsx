import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import AdminLayout from '../../components/AdminLayout'

export default function AdminIndex() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Redirect to dashboard if on /admin exactly
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [location.pathname, navigate])

  return <AdminLayout />
}
