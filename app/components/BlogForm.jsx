import React, { useState } from "react";

export default function BlogForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title ?? "",
    excerpt: initial.excerpt ?? "",
    content: initial.content ?? "",
    image_url: initial.image_url ?? "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="card p-3">
      <input
        name="title"
        className="form-control mb-2"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="excerpt"
        className="form-control mb-2"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Excerpt"
      />
      <input
        name="image_url"
        className="form-control mb-2"
        value={form.image_url}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <textarea
        name="content"
        className="form-control mb-2"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        rows="6"
      />
      <div className="d-flex gap-2">
        <button className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
