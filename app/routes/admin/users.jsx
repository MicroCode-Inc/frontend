import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import UserRow from "../../components/UserRow";
import { fetchUsers, updateUser, deleteUser } from "../../services/adminApi";

function UserForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ username: "", email: "" });
  return (
    <form
      className="card p-3 mb-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
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
      <div className="d-flex gap-2">
        <button className="btn btn-success rounded-pill px-3">Guardar</button>
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

  useEffect(() => {
    fetchUsers()
      .then((d) => setUsers(d.users ?? d))
      .catch((e) => setError(e?.error || "Error"));
  }, []);

  const handleEdit = async (user) => {
    const name = prompt("Nuevo nombre de usuario", user.username || user.name);
    if (!name) return;
    try {
      const updated = await updateUser(user.id, { ...user, username: name });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
    } catch (e) {
      setError(e?.error || "Error actualizando usuario");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar usuario?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      setError(e?.error || "Error eliminando usuario");
    }
  };

  const handleAdd = async (data) => {
    // Aquí deberías llamar a tu API para crear usuario
    setUsers((prev) => [{ id: Date.now(), ...data }, ...prev]);
    setAdding(false);
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Usuarios</h2>
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={() => setAdding(true)}
          >
            Nuevo usuario
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {adding && (
          <UserForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        )}
        <div className="card p-3 border-0 shadow-sm rounded-4">
          <div className="list-group list-group-flush">
            {users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
