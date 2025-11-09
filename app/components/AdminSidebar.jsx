import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import routes from "../routes";

export default function AdminSidebar() {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  const adminRoute = routes.find((r) => r.path === "/admin");
  const adminLinks = adminRoute?.children ?? [];

  useEffect(() => {
    const updatePillPosition = () => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;
      const activeLink = sidebar.querySelector(".nav-link.active");
      if (activeLink) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setPillStyle({
          top: `${linkRect.top - sidebarRect.top}px`,
          left: `${linkRect.left - sidebarRect.left}px`,
          width: `${linkRect.width}px`,
          height: `${linkRect.height}px`,
          opacity: 1,
          transition:
            "opacity 0.05s ease, left 0.4s cubic-bezier(0.4,0,0.2,1), top 0.4s cubic-bezier(0.4,0,0.2,1), width 0.4s cubic-bezier(0.4,0,0.2,1), height 0.4s cubic-bezier(0.4,0,0.2,1)",
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };
    updatePillPosition();
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [location.pathname]);

  return (
    <aside
      className="admin-sidebar bg-dark text-white rounded-start p-4 shadow-sm d-none d-md-block position-relative"
      ref={sidebarRef}
      style={{ minWidth: 220 }}
      aria-label="Panel de administración"
      role="navigation"
    >
      <div className="sidebar-sliding-pill" style={pillStyle} />
      <h5 className="mb-4 text-center fw-bold">Panel Admin</h5>
      <nav
        className="nav flex-column gap-1"
        aria-label="Secciones de administración"
      >
        {adminLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-link text-capitalize position-relative${
                isActive
                  ? " active border border-2 border-primary rounded-pill"
                  : " text-white"
              }`
            }
            style={{ zIndex: 2 }}
            aria-current={location.pathname === path ? "page" : undefined}
          >
            <span className="fw-semibold">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
