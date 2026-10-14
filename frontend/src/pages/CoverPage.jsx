import React, { useEffect, useState } from "react";
import { API_BASE } from "../config";
import "../styles/cover.css";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { MOODS, setAura } from "../theme/moods";

const PREVIEW_MOODS = ["Happy", "Calm", "Loved", "Excited", "Tired", "Sad", "Angry"]
  .map((label) => MOODS.find((m) => m.label === label));

export default function CoverPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);

  useEffect(() => {
    // 🔹 Boot up backend by making a request when page loads
    fetch(`${API_BASE}/`)
      .then(() => console.log("Backend boot request sent"))
      .catch((err) => console.error("Backend boot error:", err));

    return () => setAura(null);
  }, []);

  // helper function to delay navigation (gives the backend a moment to wake up)
  const handleNavigate = (path) => {
    if (pending) return;
    setPending(path);
    setTimeout(() => {
      navigate(path);
    }, 2000); // 2 second pause
  };

  const label = (path, idle) => (pending === path ? "Opening…" : idle);

  return (
    <div className="cover-page">
      <header className="cover-bar">
        <div className="cover-brand">
          <Logo size={34} />
          <span className="cover-brand-name">VibeNest</span>
        </div>
        <div className="cover-bar-actions">
          <button
            className="cover-link-btn"
            onClick={() => handleNavigate("/login")}
            disabled={!!pending}
          >
            {label("/login", "Log in")}
          </button>
          <button
            className="cover-solid-btn"
            onClick={() => handleNavigate("/signup")}
            disabled={!!pending}
          >
            {label("/signup", "Sign up")}
          </button>
        </div>
      </header>

      <main className="cover-main">
        <section className="cover-hero">
          <h1 className="cover-title">Come home to how you feel.</h1>
          <p className="cover-lede">
            VibeNest is a wellness tracker for your moods, journal entries, breathing
            sessions, soundscapes and small daily goals. ML reads the emotions in what
            you write, so patterns show up before you go looking for them.
          </p>

          <div className="cover-cta">
            <button
              className="cover-solid-btn cover-solid-btn--lg"
              onClick={() => handleNavigate("/signup")}
              disabled={!!pending}
            >
              {label("/signup", "Create your nest")}
            </button>
            <button
              className="cover-link-btn cover-link-btn--lg"
              onClick={() => handleNavigate("/login")}
              disabled={!!pending}
            >
              {label("/login", "I already have one")}
            </button>
          </div>

          <div className="mood-strip" role="group" aria-label="Try a mood">
            {PREVIEW_MOODS.map((m) => (
              <button
                key={m.label}
                type="button"
                className="mood-pebble"
                style={{ "--mood": m.color }}
                onMouseEnter={() => setAura(m.color)}
                onFocus={() => setAura(m.color)}
                onMouseLeave={() => setAura(null)}
                onBlur={() => setAura(null)}
                aria-label={m.label}
              >
                <span aria-hidden="true">{m.symbol}</span>
              </button>
            ))}
            <p className="mood-strip-hint">Try a mood. The room changes with you.</p>
          </div>
        </section>

        <section className="cover-shots" aria-label="Inside VibeNest">
          <figure className="shot shot--wide">
            <img src="/images/soundscape.jpg" alt="The Soundscape page listing calming tracks" />
            <figcaption>Soundscape: calming tracks that count toward your streak</figcaption>
          </figure>
          <figure className="shot">
            <img src="/images/insights.jpg" alt="The Insights dashboard with mood and goal charts" />
            <figcaption>Insights: a week of moods and goals at a glance</figcaption>
          </figure>
          <figure className="shot">
            <img src="/images/checkin.jpg" alt="The check-in page with a grid of moods to choose from" />
            <figcaption>Check-in: pick a mood, then write what is behind it</figcaption>
          </figure>
        </section>
      </main>

      <footer className="cover-footer">
        <span>© {new Date().getFullYear()} VibeNest</span>
      </footer>
    </div>
  );
}
