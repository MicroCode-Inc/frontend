import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import BlogForm from "../../components/BlogForm";
import AsyncButton from "../../components/AsyncButton";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/adminApi";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs()
      .then((d) => setBlogs(d.blogs ?? d))
      .catch((e) => setError(e?.error || "Error"));
  }, []);

  const handleCreate = async (p) => {
    try {
      const saved = await createBlog(p);
      setBlogs((prev) => [saved, ...prev]);
    } catch (e) {
      setError(e?.error || "Error creando blog");
    }
  };
  const handleUpdate = async (id, p) => {
    try {
      const updated = await updateBlog(id, p);
      setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (e) {
      setError(e?.error || "Error actualizando blog");
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Eliminar publicación?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      setError(e?.error || "Error eliminando blog");
    }
  };

  return (
    <div>
      <div className="container-lg py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Publicaciones</h2>
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => setEditing({})}
          >
            Nuevo Blog
          </button>
        </div>
        {editing !== null && (
          <div className="mt-4">
            <div className="card p-4 shadow-sm border-0">
              <BlogForm
                initial={editing}
                onSave={async (p) => {
                  if (editing.id) await handleUpdate(editing.id, p);
                  else await handleCreate(p);
                  setEditing(null);
                }}
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-4">
          {blogs.length === 0 && (
            <div className="col-12">
              <div className="alert alert-info text-center mb-0">
                No hay publicaciones.
              </div>
            </div>
          )}
          {blogs.map((b) => (
            <div className="col-12 col-md-6 col-lg-4" key={b.id}>
              <div className="card h-100 shadow-sm border-0">
                {b.image_url && (
                  <img
                    src={b.image_url}
                    alt=""
                    className="card-img-top rounded-top"
                    style={{
                      objectFit: "cover",
                      height: "180px",
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{b.title}</h5>
                  <p className="card-text text-muted small mb-2">
                    {b.excerpt || b.description}
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={() => setEditing(b)}
                    >
                      Editar
                    </button>
                    <AsyncButton
                      onClick={async () => await handleDelete(b.id)}
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      loadingText="Eliminando..."
                    >
                      Eliminar
                    </AsyncButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
