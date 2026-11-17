import React from "react";
import useAuth from "../auth/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Change Management System</h1>
      {user ? <p>Welcome, <strong>{user.name}</strong> ({user.role})</p> : <p>Please login to continue.</p>}
    </div>
  );
}
