import { useEffect, useState } from "react";
import { getIssues, updateIssueStatus, addComment } from "../api/api";

const STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "DONE"];

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getIssues();
        setIssues(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        alert("Failed to load issues.");
        setErr(String(e.message || e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onChangeStatus(id, newStatus) {
    try {
      await updateIssueStatus(id, newStatus);
      setIssues((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: newStatus } : it))
      );
    } catch (e) {
      console.error(e);
      alert("Status update failed. Check backend.");
    }
  }

  async function onAddComment(id) {
    const text = (commentDrafts[id] || "").trim();
    if (!text) return;
    try {
      await addComment(id, text);
      setCommentDrafts((d) => ({ ...d, [id]: "" }));
    } catch (e) {
      console.error(e);
      alert("Adding comment failed.");
    }
  }

  if (loading) return <p>Loading issues…</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!issues.length) return <p>No issues yet.</p>;

  return (
    <div className="card">
      <h3>Issues</h3>
      <table className="tbl">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Title</th>
            <th style={{ width: 140 }}>Status</th>
            <th style={{ width: 320 }}>Add Comment</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {it.description}
                </div>
              </td>
              <td>
                <select
                  value={(it.status || "OPEN").toUpperCase()}
                  onChange={(e) => onChangeStatus(it.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    placeholder="Write a quick comment…"
                    value={commentDrafts[it.id] || ""}
                    onChange={(e) =>
                      setCommentDrafts((d) => ({
                        ...d,
                        [it.id]: e.target.value,
                      }))
                    }
                    style={{ flex: 1 }}
                  />
                  <button onClick={() => onAddComment(it.id)}>Add</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .card { background: #fff; padding: 16px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
        .tbl { width: 100%; border-collapse: collapse; }
        .tbl th, .tbl td { border-bottom: 1px solid #eee; padding: 10px; text-align: left; }
        select, input, button { padding: 8px; }
      `}</style>
    </div>
  );
}
