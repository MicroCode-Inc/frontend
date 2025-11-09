import React, { useState } from "react";

export default function BlogForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title ?? "",
    author_name: initial.author_name ?? "",
    email: initial.email ?? "",
    url: initial.url ?? "",
    description: initial.description ?? "",
    tags: (initial.tags || []).map((t) => t.label || t) || [],
    image_url: initial.image_url ?? "",
    image_alt: initial.image_alt ?? "",
    excerpt: initial.excerpt ?? "",
    content: initial.content ?? "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleTags = (e) =>
    setForm((s) => ({
      ...s,
      tags: e.target.value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.map((t) => ({ label: t })),
      image_alt: form.image_alt,
    };
    onSave(payload);
  };

  return (
    <form onSubmit={submit} className="card p-3">
      <input
        name="title"
        className="form-control mb-2"
        value={form.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <input
        name="author_name"
        className="form-control mb-2"
        value={form.author_name}
        onChange={handleChange}
        placeholder="Autor"
        required
      />
      <input
        name="email"
        className="form-control mb-2"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="url"
        className="form-control mb-2"
        value={form.url}
        onChange={handleChange}
        placeholder="URL relacionada"
      />
      <input
        name="image_url"
        className="form-control mb-2"
        value={form.image_url}
        onChange={handleChange}
        placeholder="URL de imagen"
      />
      <input
        name="image_alt"
        className="form-control mb-2"
        value={form.image_alt}
        onChange={handleChange}
        placeholder="Texto alternativo de imagen"
      />
      <input
        name="tags"
        className="form-control mb-2"
        value={form.tags.join(", ")}
        onChange={handleTags}
        placeholder="Etiquetas (separadas por coma)"
      />
      <input
        name="description"
        className="form-control mb-2"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción breve"
      />
      <input
        name="excerpt"
        className="form-control mb-2"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Extracto"
      />
      <textarea
        name="content"
        className="form-control mb-2"
        value={form.content}
        onChange={handleChange}
        placeholder="Contenido"
        rows="6"
      />
      <div className="d-flex gap-2">
        <button className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
