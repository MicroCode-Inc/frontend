import React from "react";

export default function AdminTopbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-2 border-bottom bg-white shadow-sm rounded-top">
      <h2 className="mb-0 h5 fw-bold">Panel de Administración</h2>
    </header>
  );
}
