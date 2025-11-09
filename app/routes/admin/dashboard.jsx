import React, { useEffect, useState } from "react";
import { fetchCourses, fetchBlogs, fetchUsers } from "../../services/adminApi";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ courses: 0, blogs: 0, users: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

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

  return (
    <div className="container-lg py-4">
      <h2 className="mb-4">Panel de administración</h2>
      <div className="row g-3 mb-4">
        <div className="col">
          <div className="p-3 border rounded shadow-sm text-center bg-white">
            <div className="text-black">Cursos</div>
            <div className="fw-bold fs-4 text-primary">{counts.courses}</div>
          </div>
        </div>
        <div className="col">
          <div className="p-3 border rounded shadow-sm text-center bg-white">
            <div className="text-black">Publicaciones</div>
            <div className="fw-bold fs-4 text-primary">{counts.blogs}</div>
          </div>
        </div>
        <div className="col">
          <div className="p-3 border rounded shadow-sm text-center bg-white">
            <div className="text-black">Usuarios</div>
            <div className="fw-bold fs-4 text-primary">{counts.users}</div>
          </div>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title">Últimos cursos</h6>
              <ul className="list-group list-group-flush mt-3 mb-0">
                {recentCourses.length === 0 ? (
                  <li className="list-group-item text-center text-muted">
                    No hay cursos recientes.
                  </li>
                ) : (
                  recentCourses.map((c) => (
                    <li
                      key={c.id}
                      className="list-group-item bg-transparent border-0 border-bottom"
                    >
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
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="card-title">Últimas publicaciones</h6>
              <ul className="list-group list-group-flush mt-3 mb-0">
                {recentBlogs.length === 0 ? (
                  <li className="list-group-item text-center text-muted">
                    No hay publicaciones recientes.
                  </li>
                ) : (
                  recentBlogs.map((b) => (
                    <li
                      key={b.id}
                      className="list-group-item bg-transparent border-0 border-bottom"
                    >
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
    </div>
  );
}
