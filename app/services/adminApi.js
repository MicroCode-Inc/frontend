const API_BASE = "http://127.0.0.1:5000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleRes(res) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw json;
  return json;
}

/* Courses */
export async function fetchCourses() {
  const res = await fetch(`${API_BASE}/courses`, {
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}
export async function createCourse(payload) {
  const res = await fetch(`${API_BASE}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}
export async function updateCourse(id, payload) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}
export async function deleteCourse(id) {
  const res = await fetch(`${API_BASE}/courses/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}

/* Blogs */
export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/blogs`, {
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}
export async function createBlog(payload) {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}
export async function updateBlog(id, payload) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}
export async function deleteBlog(id) {
  const res = await fetch(`${API_BASE}/blogs/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}

/* Users */
export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`, {
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}
export async function updateUser(id, payload) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
}
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  return handleRes(res);
}
