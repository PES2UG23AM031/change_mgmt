import { useEffect, useState } from "react";
import { getNotifications } from "../api/api";

export default function NotificationList() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Could not load notifications.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="card">
      <h3>Notifications</h3>
      {loading ? (
        <p>Loading…</p>
      ) : err ? (
        <p style={{ color: "crimson" }}>{err}</p>
      ) : items.length ? (
        <ul>
          {items.map((n, idx) => (
            <li key={idx}>
              <b>#{n.issue_id}</b> {n.message || n.text}
              <span style={{ opacity: 0.6, marginLeft: 8 }}>
                {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
      <style>{`
        .card { background:#fff; padding:16px; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
        ul { margin:0; padding-left:18px; }
        li { margin: 6px 0; }
      `}</style>
    </div>
  );
}
