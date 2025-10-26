import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("http://127.0.0.1:5000/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Error");
      return;
    }
    // guardar token y redirigir
    localStorage.setItem("token", json.token);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          name="name"
          type="text"
          className="form-control mb-2"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="email"
          type="email"
          className="form-control mb-2"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          className="form-control mb-2"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
