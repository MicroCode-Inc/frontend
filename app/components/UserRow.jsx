import React from "react";
import AsyncButton from "./AsyncButton";

export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center py-3 px-3">
      <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 flex-grow-1">
        <div>
          <div className="fw-bold">{user.username || user.name}</div>
          <div className="small text-muted">{user.email}</div>
        </div>
        <div className="small text-secondary-muted">
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
        <AsyncButton
          onClick={async () => await onEdit(user)}
          className="btn btn-outline-primary"
          loadingText="Editando..."
        >
          Editar
        </AsyncButton>
        <AsyncButton
          onClick={async () => await onDelete(user.id)}
          className="btn btn-outline-danger"
          loadingText="Eliminando..."
        >
          Eliminar
        </AsyncButton>
      </div>
    </div>
  );
}
