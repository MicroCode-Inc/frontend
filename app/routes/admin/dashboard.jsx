import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { fetchCourses, fetchBlogs } from "../../services/adminApi";
import { formatDateShort } from "../../utils/helpers";

export default function AdminDashboard() {
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetchCourses()
      .then((d) => setRecentCourses((d.courses ?? d).slice(0, 5)))
      .catch(() => {});
    fetchBlogs()
      .then((d) => setRecentBlogs((d.blogs ?? d).slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Resumen rápido</h2>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card p-4 shadow-sm bo h-100">
              <h5 className="mb-3">Últimos cursos</h5>
              <ul className="list-group list-group-flush">
                {recentCourses.length === 0 ? (
                  <li className="list-group-item">No hay cursos recientes.</li>
                ) : (
                  recentCourses.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3 px-2 bg-transparent border-0 border-bottom"
                    >
                      <div>
                        <div className="fw-bold">{c.name}</div>
                        <small className="text-muted">
                          {c.topic} · {c.level}
                        </small>
                      </div>
                      <small className="text-muted">
                        {c.updated_at ? formatDateShort(c.updated_at) : ""}
                      </small>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card p-4 shadow-sm border-0 h-100">
              <h5 className="mb-3">Últimas publicaciones</h5>
              <ul className="list-group list-group-flush">
                {recentBlogs.length === 0 ? (
                  <li className="list-group-item">
                    No hay publicaciones recientes.
                  </li>
                ) : (
                  recentBlogs.map((b) => (
                    <li
                      key={b.id}
                      className="list-group-item d-flex justify-content-between align-items-center py-3 px-2 bg-transparent border-0 border-bottom"
                    >
                      <div>
                        <div className="fw-bold">{b.title}</div>
                        <small className="text-muted">{b.author_name}</small>
                      </div>
                      <small className="text-muted">
                        {b.published_at ? formatDateShort(b.published_at) : ""}
                      </small>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <a
            href="/admin/courses"
            className="btn btn-primary rounded-pill px-4"
          >
            Nuevo curso
          </a>
          <a href="/admin/blogs" className="btn btn-success rounded-pill px-4">
            Nueva publicación
          </a>
          <a href="/admin/users" className="btn btn-danger rounded-pill px-4">
            Nuevo usuario
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
