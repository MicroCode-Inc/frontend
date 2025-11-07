import React from "react";

export default function AdminTopbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="admin-topbar d-flex align-items-center justify-content-between px-4 py-2 border-bottom bg-white">
      <h2 className="mb-0 h5 fw-bold">Panel de Administración</h2>
      <button className="btn btn-primary btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
