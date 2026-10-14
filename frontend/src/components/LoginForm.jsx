import H1 from './H1';
import Button from './Button';
import Logo from './Logo';
import '../styles/login-form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from "../config";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Map username input to email for backend
    const formData = {
      email: e.target.username.value.trim(),
      password: e.target.password.value,
    };

    // ✅ Client-side validation
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Login successful. Taking you in…");

        // Store JWT token
        localStorage.setItem("token", data.token);

        // Redirect to /app after 3 seconds
        setTimeout(() => {
          window.location.href = "/app";
        }, 3000);
      } else {
        setError(data.error || "Login failed.");
        setBusy(false);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setBusy(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Brand shown only when the left panel is hidden (small screens) */}
      <div className="login-title">
        <Logo size={30} />
        <span>VibeNest</span>
      </div>

      <H1>Welcome back</H1>
      <p className="form-sub">Log in to pick up where you left off.</p>

      <label htmlFor="username" className="login-label">Email</label>
      <input
        type="text"
        id="username"
        name="username"
        className="login-input"
        placeholder="you@example.com"
        autoComplete="username"
        required
      />

      <label htmlFor="password" className="login-label">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="login-input"
        autoComplete="current-password"
        required
      />

      <Button type="submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</Button>

      <p className="login-footer">
        New to VibeNest? <Link to="/signup">Create an account</Link>
      </p>

      {error && <p className="form-msg is-error" role="alert">{error}</p>}
      {success && <p className="form-msg is-success" role="status">{success}</p>}
    </form>
  );
}
