import React, { useState } from "react";
import AsyncButton from "./AsyncButton";

export default function CourseForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name ?? "",
    topic: initial.topic ?? "",
    level: initial.level ?? "",
    price: initial.price ?? 0,
    discount: initial.discount ?? 0,
    description: initial.description ?? "",
    image_url: initial.image_url ?? "",
    image_alt: initial.image_alt ?? "",
    image_header: initial.image_header ?? "",
    tags: (initial.tags || []).map((t) => t.label || t) || [],
    summary: initial.summary ? JSON.stringify(initial.summary, null, 2) : "",
    content: initial.content ? JSON.stringify(initial.content, null, 2) : "",
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

  const submit = async () => {
    let payload = {
      ...form,
      tags: form.tags.map((t) => ({ label: t })),
      image_alt: form.image_alt,
    };
    // Parse summary y content si son JSON válidos
    try {
      payload.summary = form.summary ? JSON.parse(form.summary) : null;
    } catch {}
    try {
      payload.content = form.content ? JSON.parse(form.content) : null;
    } catch {}
    await onSave(payload);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="card p-3">
      <input
        name="name"
        className="form-control mb-2"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <div className="d-flex gap-2 mb-2">
        <input
          name="topic"
          className="form-control"
          value={form.topic}
          onChange={handleChange}
          placeholder="Topic"
        />
        <input
          name="level"
          className="form-control"
          value={form.level}
          onChange={handleChange}
          placeholder="Nivel"
        />
      </div>
      <div className="d-flex gap-2 mb-2">
        <input
          name="price"
          type="number"
          className="form-control"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
        />
        <input
          name="discount"
          type="number"
          className="form-control"
          value={form.discount}
          onChange={handleChange}
          placeholder="Descuento"
        />
      </div>
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
        name="image_header"
        className="form-control mb-2"
        value={form.image_header}
        onChange={handleChange}
        placeholder="URL de imagen de cabecera (1920x420)"
      />
      <textarea
        name="description"
        className="form-control mb-2"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        rows="3"
      />
      <input
        name="tags"
        className="form-control mb-2"
        value={form.tags.join(", ")}
        onChange={handleTags}
        placeholder="Etiquetas (separadas por coma)"
      />
      <textarea
        name="summary"
        className="form-control mb-2"
        value={form.summary}
        onChange={handleChange}
        placeholder="Resumen (JSON)"
        rows="2"
      />
      <textarea
        name="content"
        className="form-control mb-2"
        value={form.content}
        onChange={handleChange}
        placeholder="Contenido (JSON)"
        rows="4"
      />
      <div className="d-flex gap-2">
        <AsyncButton
          onClick={submit}
          className="btn btn-primary"
          loadingText="Guardando..."
        >
          Guardar
        </AsyncButton>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
