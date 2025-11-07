import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import "../styles/admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout d-flex">
      <AdminSidebar />
      <div className="admin-content flex-grow-1 d-flex flex-column">
        <AdminTopbar />
        <main className="admin-main flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}
