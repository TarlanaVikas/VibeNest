import React, { useState } from "react";
import { API_BASE } from "../config";
import "../styles/reflectionCard.css";

export default function ReflectionCard() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState("ok");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setStatusType("error");
      setStatus("Write a reflection before submitting.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/reflections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Request failed: ${res.status} ${res.statusText} - ${errText}`);
      }

      const data = await res.json();
      console.log("Reflection saved:", data);
      setStatusType("ok");
      setStatus("Reflection saved.");
      setText("");
    } catch (err) {
      console.error("Error submitting reflection:", err);
      setStatusType("error");
      setStatus(`Could not save: ${err.message}`);
    }
  };

  return (
    <div className="reflection-card">
      <h3 className="card-heading">Daily reflection</h3>
      <form onSubmit={handleSubmit} className="reflection-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How did today go? Write a few lines…"
          aria-label="Daily reflection"
          rows={5}
          className="reflection-textarea"
        />
        <button type="submit" className="reflection-submit">
          Save reflection
        </button>
      </form>
      {status && <p className={`reflection-status ${statusType === "error" ? "is-error" : "is-ok"}`} role="status">{status}</p>}
    </div>
  );
}
