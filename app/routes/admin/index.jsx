import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  fetchCourses,
  fetchBlogs,
  fetchUsers,
  createCourse,
  createBlog,
} from "../../services/adminApi";
import { formatDateShort } from "../../utils/helpers";
import CourseForm from "../../components/CourseForm";
import BlogForm from "../../components/BlogForm";

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

export default function AdminIndex() {
  const [counts, setCounts] = useState({ courses: 0, blogs: 0, users: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [showForm, setShowForm] = useState(null); // 'course' | 'blog' | 'user' | null

  useEffect(() => {
    fetchCourses().then((d) => {
      const arr = d.courses ?? d;
      setCounts((c) => ({ ...c, courses: arr.length ?? 0 }));
      setRecentCourses(arr.slice(0, 3));
    });
    fetchBlogs().then((d) => {
      const arr = d.blogs ?? d;
      setCounts((c) => ({ ...c, blogs: arr.length ?? 0 }));
      setRecentBlogs(arr.slice(0, 3));
    });
    fetchUsers().then((d) => {
      const arr = d.users ?? d;
      setCounts((c) => ({ ...c, users: arr.length ?? 0 }));
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Guardar curso/blog/usuario (simulado)
  const handleSaveCourse = async (data) => {
    await createCourse(data);
    setShowForm(null);
    // Recargar cursos
    fetchCourses().then((d) => {
      const arr = d.courses ?? d;
      setCounts((c) => ({ ...c, courses: arr.length ?? 0 }));
      setRecentCourses(arr.slice(0, 3));
    });
  };
  const handleSaveBlog = async (data) => {
    await createBlog(data);
    setShowForm(null);
    fetchBlogs().then((d) => {
      const arr = d.blogs ?? d;
      setCounts((c) => ({ ...c, blogs: arr.length ?? 0 }));
      setRecentBlogs(arr.slice(0, 3));
    });
  };
  const handleSaveUser = async (data) => {
    // Aquí deberías llamar a tu API para crear usuario
    setShowForm(null);
    fetchUsers().then((d) => {
      const arr = d.users ?? d;
      setCounts((c) => ({ ...c, users: arr.length ?? 0 }));
    });
  };

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="mb-4">Admin Dashboard</h1>
        <div className="card-body p-0 mb-4">
          <div className="row g-3 mb-3">
            <div className="col">
              <div className="p-3 border rounded shadow-sm text-center">
                <div className="text-muted">Cursos</div>
                <div className="fw-bold fs-4 text-primary">
                  {counts.courses}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="p-3 border rounded shadow-sm text-center">
                <div className="text-muted">Publicaciones</div>
                <div className="fw-bold fs-4 text-primary">{counts.blogs}</div>
              </div>
            </div>
            <div className="col">
              <div className="p-3 border rounded shadow-sm text-center">
                <div className="text-muted">Usuarios</div>
                <div className="fw-bold fs-4 text-primary">{counts.users}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Últimos cursos</h6>
                <ul className="list-unstyled mt-3 mb-0">
                  {recentCourses.length === 0 ? (
                    <li className="mb-2 p-3 rounded bg-light text-center">
                      No hay cursos recientes.
                    </li>
                  ) : (
                    recentCourses.map((c) => (
                      <li key={c.id} className="mb-2 p-3 rounded bg-light">
                        <strong>{c.name}</strong>
                        <div className="small text-muted">
                          {c.topic} · {c.level}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Últimas publicaciones</h6>
                <ul className="list-unstyled mt-3 mb-0">
                  {recentBlogs.length === 0 ? (
                    <li className="mb-2 p-3 rounded bg-light text-center">
                      No hay publicaciones recientes.
                    </li>
                  ) : (
                    recentBlogs.map((b) => (
                      <li key={b.id} className="mb-2 p-3 rounded bg-light">
                        <strong>{b.title}</strong>
                        <div className="small text-muted">
                          {b.published_at ? b.published_at.slice(0, 4) : ""} ·{" "}
                          {b.author_name}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-white rounded shadow-sm d-flex align-items-center">
          <span className="me-auto text-muted">Acciones rápidas:</span>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => setShowForm("course")}
          >
            Nuevo curso
          </button>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => setShowForm("blog")}
          >
            Nueva publicación
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => setShowForm("user")}
          >
            Nuevo usuario
          </button>
        </div>
        {showForm === "course" && (
          <div className="mt-4">
            <CourseForm
              onSave={handleSaveCourse}
              onCancel={() => setShowForm(null)}
            />
          </div>
        )}
        {showForm === "blog" && (
          <div className="mt-4">
            <BlogForm
              onSave={handleSaveBlog}
              onCancel={() => setShowForm(null)}
            />
          </div>
        )}
        {showForm === "user" && (
          <div className="mt-4">
            <UserForm
              onSave={handleSaveUser}
              onCancel={() => setShowForm(null)}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
