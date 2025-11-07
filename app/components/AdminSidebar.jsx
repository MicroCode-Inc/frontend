import React from "react";
import { NavLink } from "react-router";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar p-3">
      <h5 className="mb-4 text-center fw-bold">Panel Admin</h5>
      <nav className="nav flex-column gap-1">
        <NavLink to="/admin" className="nav-link">
          <span className="fw-semibold">Overview</span>
        </NavLink>
        <NavLink to="/admin/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/courses" className="nav-link">
          Cursos
        </NavLink>
        <NavLink to="/admin/blogs" className="nav-link">
          Publicaciones
        </NavLink>
        <NavLink to="/admin/users" className="nav-link">
          Usuarios
        </NavLink>
      </nav>
    </aside>
  );
}
