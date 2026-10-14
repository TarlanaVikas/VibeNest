import H2 from './H2';
import Button from './Button';
import Logo from './Logo';
import '../styles/signup-form.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from "../config";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      age: e.target.age.value,
      sleepDuration: e.target.sleep.value,
      activityLevel: e.target.activity.value,
      overwhelmFrequency: e.target.overwhelm.value,
      currentState: e.target.state.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    // ✅ Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Name, Email, and Password are required.");
      return;
    }

    // Password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Password strength check
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // Age and sleep checks
    if (formData.age && formData.age <= 0) {
      setError("Age must be a positive number.");
      return;
    }
    if (formData.sleepDuration && formData.sleepDuration <= 0) {
      setError("Sleep duration must be a positive number.");
      return;
    }

    setBusy(true);
    try {
      // Step 1: Check if email exists
      const checkResponse = await fetch(`${API_BASE}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const checkData = await checkResponse.json();
      if (checkResponse.ok && checkData.exists) {
        setError("Email already registered. Please log in.");
        setBusy(false);
        return;
      }

      // Step 2: Proceed with signup
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Account created. Taking you to log in…");

        // ⏳ Wait 5 seconds then redirect
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        setError(data.error || "Signup failed.");
        setBusy(false);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setBusy(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* Brand shown only when the left panel is hidden (small screens) */}
      <div className="signup-title">
        <Logo size={30} />
        <span>VibeNest</span>
      </div>

      <H2>Create your nest</H2>
      <p className="form-sub">A few quick questions help VibeNest tune itself to you.</p>

      <label htmlFor="name" className="signup-label">Name</label>
      <input type="text" id="name" name="name" className="signup-input" autoComplete="name" required />

      <label htmlFor="email" className="signup-label">Email</label>
      <input type="email" id="email" name="email" className="signup-input" autoComplete="email" required />

      <div className="signup-row">
        <div className="signup-field">
          <label htmlFor="age" className="signup-label">Age</label>
          <input type="number" id="age" name="age" className="signup-input" />
        </div>
        <div className="signup-field">
          <label htmlFor="sleep" className="signup-label">Sleep (hours)</label>
          <input type="number" id="sleep" name="sleep" className="signup-input" />
        </div>
      </div>

      <label htmlFor="activity" className="signup-label">How active are you during the day?</label>
      <select id="activity" name="activity" className="signup-input">
        <option>I'm on the move most of the day</option>
        <option>I balance being stationary and movement</option>
        <option>I don’t move much</option>
        <option>I have conditions that limit movement</option>
      </select>

      <label htmlFor="overwhelm" className="signup-label">How often do you feel overwhelmed?</label>
      <select id="overwhelm" name="overwhelm" className="signup-input">
        <option>Mostly</option>
        <option>Sometimes</option>
        <option>Rarely</option>
      </select>

      <label htmlFor="state" className="signup-label">How would you rate your current state?</label>
      <select id="state" name="state" className="signup-input">
        <option>Best</option>
        <option>Good, but need improvement</option>
        <option>Not good</option>
      </select>

      <label htmlFor="password" className="signup-label">Password</label>
      <input type="password" id="password" name="password" className="signup-input" autoComplete="new-password" required />

      <label htmlFor="confirmPassword" className="signup-label">Confirm password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" className="signup-input" autoComplete="new-password" required />

      <Button type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</Button>

      <p className="signup-footer">
        Already a member? <Link to="/login">Log in</Link>
      </p>

      {error && <p className="form-msg is-error" role="alert">{error}</p>}
      {success && <p className="form-msg is-success" role="status">{success}</p>}
    </form>
  );
}
