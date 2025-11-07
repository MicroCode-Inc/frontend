import React, { useState } from "react";

export default function CourseForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name ?? "",
    topic: initial.topic ?? "",
    level: initial.level ?? "",
    price: initial.price ?? 0,
    discount: initial.discount ?? 0,
    description: initial.description ?? "",
    image_url: initial.image_url ?? "",
    tags: (initial.tags || []).map((t) => t.label || t) || [],
  });
  const [saving, setSaving] = useState(false);

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

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.map((t) => ({ label: t })),
    };
    try {
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="card p-3">
      <input
        name="name"
        className="form-control mb-2"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
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
          placeholder="Level"
        />
      </div>
      <div className="d-flex gap-2 mb-2">
        <input
          name="price"
          type="number"
          className="form-control"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          name="discount"
          type="number"
          className="form-control"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
        />
      </div>
      <textarea
        name="description"
        className="form-control mb-2"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
      />
      <input
        name="image_url"
        className="form-control mb-2"
        value={form.image_url}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <input
        name="tags"
        className="form-control mb-2"
        value={form.tags.join(", ")}
        onChange={handleTags}
        placeholder="tag1, tag2"
      />
      <div className="d-flex gap-2">
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
