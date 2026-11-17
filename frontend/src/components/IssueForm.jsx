import React, { useState } from "react";
import { createIssue } from "../api/api";
import useAuth from "../auth/useAuth";

export default function IssueForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newIssue = await createIssue({
        title,
        description: desc,
        reporter_id: user?.id,
      });
      setMsg("Issue created successfully!");
      setTitle("");
      setDesc("");
      if (onCreated) onCreated(newIssue);
    } catch (err) {
      console.error(err);
      setMsg("Failed to create issue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <h4>Create Issue</h4>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
