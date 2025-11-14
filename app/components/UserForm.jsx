import React, { useState } from "react";
import AsyncButton from "./AsyncButton";

export default function UserForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        className="form-control mb-2"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
        required
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        required
      />
      <div className="form-floating mb-2">
        <input
          className="form-control"
          type="password"
          id="floatingPassword"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
        />
        <label htmlFor="floatingPassword">Contraseña</label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex gap-2">
        <AsyncButton
          onClick={async () => {
            await onSave(form);
          }}
          onError={(err) => setError(err?.error || "Error guardando usuario")}
          className="btn btn-success"
          loadingText="Guardando..."
        >
          Guardar
        </AsyncButton>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
