import React, { useState, useEffect } from 'react';
import { API_BASE } from "../config";
import '../styles/streak.css';

export default function Streak() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // redirect if no token
      return;
    }

    fetch(`${API_BASE}/api/streak`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 400 || res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.currStreak !== undefined) {
          setDays(data.currStreak);
        }
      })
      .catch((err) => console.error("Error fetching streak:", err));
  }, []);

  const lit = days > 0;

  return (
    <div
      className={`streak-chip ${lit ? "is-lit" : ""}`}
      role="status"
      aria-label={lit ? `${days} day streak` : "No streak yet"}
      title={lit ? `${days} day streak` : "Check in to start a streak"}
    >
      <svg className="thunder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M13 2 L3 14 H11 L9 22 L21 10 H13 Z"
          fill={lit ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {lit && <span className="streak-days">{days}</span>}
    </div>
  );
}
