import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import CourseForm from "../../components/CourseForm";
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/adminApi";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchCourses()
      .then((d) => setCourses(d.courses ?? d))
      .catch((e) => setError(e?.error || "Error"));
  }, []);

  const handleCreate = async (payload) => {
    try {
      const saved = await createCourse(payload);
      setCourses((prev) => [saved, ...prev]);
    } catch (e) {
      setError(e?.error || "Error creando curso");
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await updateCourse(id, payload);
      setCourses((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (e) {
      setError(e?.error || "Error actualizando curso");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar curso?")) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      setError(e?.error || "Error eliminando curso");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Cursos</h2>
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={() => setEditing({})}
          >
            Nuevo Curso
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-4">
          {courses.map((c) => (
            <div className="col-12 col-md-6 col-lg-4" key={c.id}>
              <div className="card h-100 shadow-sm border-0">
                {c.image_url && (
                  <img
                    src={c.image_url}
                    alt=""
                    className="card-img-top rounded-top"
                    style={{
                      objectFit: "cover",
                      height: "180px",
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {c.topic} · {c.level}
                  </p>
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill px-3"
                      onClick={() => setEditing(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      onClick={() => handleDelete(c.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editing !== null && (
          <div className="mt-4">
            <CourseForm
              initial={editing}
              onSave={async (p) => {
                if (editing.id) await handleUpdate(editing.id, p);
                else await handleCreate(p);
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-primary rounded-pill px-4"
          onClick={() => setEditing({})}
        >
          Nuevo curso
        </button>
        <a href="/admin/blogs" className="btn btn-success rounded-pill px-4">
          Nueva publicación
        </a>
        <a href="/admin/users" className="btn btn-danger rounded-pill px-4">
          Nuevo usuario
        </a>
      </div>
    </AdminLayout>
  );
}
