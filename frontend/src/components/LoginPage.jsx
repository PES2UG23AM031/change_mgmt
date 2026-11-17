import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { validateEmail } from "../utils/validators";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) return setError("Enter a valid email.");
    if (password.length < 8) return setError("Password must be at least 8 chars.");
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2>Change Management Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input aria-label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input aria-label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <a href="/reset-password">Forgot password?</a>
      <div style={{ marginTop: 16 }}>
        <small>Demo creds: any valid email + password with uppercase, lowercase, number, special char (e.g. User@123$)</small>
      </div>
    </div>
  );
}
