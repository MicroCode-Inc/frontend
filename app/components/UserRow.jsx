import React from "react";

export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
      <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 flex-grow-1">
        <div>
          <div className="fw-bold">{user.username || user.name}</div>
          <div className="small text-muted">{user.email}</div>
        </div>
        <div className="small text-secondary">
          <span className="me-2">
            <strong>Rol:</strong> {user.role || "Usuario"}
          </span>
          <span className="me-2">
            <strong>Registro:</strong>{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "-"}
          </span>
          <span>
            <strong>Estado:</strong> {user.active ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm btn-outline-primary rounded-pill px-3"
          onClick={() => onEdit(user)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-outline-danger rounded-pill px-3"
          onClick={() => onDelete(user.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
