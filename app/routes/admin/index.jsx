import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { Outlet } from "react-router-dom";

export default function AdminIndex() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
