// frontend/src/api/api.js
// Unified API helper for Issues, Comments, and Notifications

const BASE_URL =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:8000/api"; // if backend uses '/api' prefix

async function http(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const opts = {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  };

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("HTTP Error:", res.status, res.statusText, text);
    throw new Error(`${res.status} ${res.statusText}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ----- ISSUES -----
export async function getIssues() {
  return http("/issues");
}

export async function createIssue(payload) {
  return http("/issues", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateIssueStatus(issueId, status) {
  return http(`/issues/${issueId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// ----- COMMENTS -----
export async function addComment(issueId, text) {
  return http(`/issues/${issueId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

// ----- NOTIFICATIONS -----
export async function getNotifications() {
  try {
    return await http("/notifications");
  } catch (err) {
    console.warn("No /notifications endpoint available:", err.message);
    return [];
  }
}
