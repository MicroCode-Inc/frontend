import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import UserRow from "../../components/UserRow";
import AsyncButton from "../../components/AsyncButton";
import { fetchUsers, updateUser, deleteUser } from "../../services/adminApi";

function UserForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);

  return (
    <form
      className="card p-4 shadow-sm border-0 mb-3"
      onSubmit={(e) => e.preventDefault()}
    >
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
          className="btn btn-success rounded-pill px-3"
          loadingText="Guardando..."
        >
          Guardar
        </AsyncButton>
        <button
          type="button"
          className="btn btn-secondary rounded-pill px-3"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const d = await fetchUsers();
      setUsers(d.users ?? d);
      setError(null);
    } catch (e) {
      setError(e?.error || "Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = async (user) => {
    const name = prompt("Nuevo nombre de usuario", user.username || user.name);
    if (!name) return;
    setLoading(true);
    try {
      const updated = await updateUser(user.id, { ...user, username: name });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      setError(null);
    } catch (e) {
      setError(e?.error || "Error actualizando usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar usuario?")) return;
    setLoading(true);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setError(null);
    } catch (e) {
      setError(e?.error || "Error eliminando usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      // Aquí deberías llamar a tu API para crear usuario
      setUsers((prev) => [{ id: Date.now(), ...data }, ...prev]);
      setError(null);
    } catch (e) {
      setError(e?.error || "Error creando usuario");
    } finally {
      setAdding(false);
      setLoading(false);
    }
  };

  // Filtro y paginación
  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(filter.toLowerCase()) ||
      u.email?.toLowerCase().includes(filter.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div>
      <div className="container-lg py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Usuarios</h2>
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={() => setAdding(true)}
          >
            Nuevo usuario
          </button>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o email..."
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="alert alert-info">Cargando...</div>}
        {adding && (
          <UserForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        )}
        <div className="card p-3 border-0 shadow-sm rounded-4">
          <div className="list-group list-group-flush">
            {paginatedUsers.length === 0 && !loading && (
              <div className="alert alert-info text-center mb-0">
                No hay usuarios.
              </div>
            )}
            {paginatedUsers.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        {/* Paginación */}
        {totalPages > 1 && (
          <nav className="mt-3 d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item${page === 1 ? " disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Anterior
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item${page === i + 1 ? " active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item${page === totalPages ? " disabled" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
