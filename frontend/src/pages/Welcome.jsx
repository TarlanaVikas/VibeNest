import React, { useEffect } from "react";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import VibeNestCard from "../components/VibeNestCard";
import "../styles/welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 Boot up backend by making a request
    fetch(`${API_BASE}/`)
      .then(() => console.log("Backend boot request sent"))
      .catch((err) => console.error("Backend boot error:", err));

    // 🔹 Redirect after 5s with fade-out transition
    let exitTimer;
    const timer = setTimeout(() => {
      const page = document.querySelector(".welcome-page");
      if (page) page.classList.add("fade-out");

      exitTimer = setTimeout(() => navigate("/home"), 500); // wait for fade-out
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(exitTimer);
    };
  }, [navigate]);

  return (
    <div className="welcome-page fade-in">
      <VibeNestCard as="h1" />
      <div className="welcome-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
