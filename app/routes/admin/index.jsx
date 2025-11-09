import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Outlet } from 'react-router'

export default function AdminIndex() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
