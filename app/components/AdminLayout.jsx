import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="container d-flex min-vh-100 bg-light">
      <AdminSidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <main className="flex-grow-1 d-flex flex-column justify-content-center">
          <div className="container-lg py-4">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11 col-lg-10">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
