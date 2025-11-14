import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import UserRow from "../../components/UserRow";
import { fetchUsers, updateUser, deleteUser } from "../../services/adminApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { reloadTrigger } = useOutletContext();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (reloadTrigger > 0) {
      loadUsers();
    }
  }, [reloadTrigger]);

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
      <div className="pt-3">
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
        <div className="card p-3 border-0 shadow rounded-4 bg-light">
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
