import React, { useState, useEffect } from "react";
import { API_BASE } from "../config";
import Button from "../components/Button";
import { MOODS, setAura } from "../theme/moods";
import "../styles/feeling.css";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function FeelingPage() {
  const [name] = useState("Buddy"); // Static default name
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [saved, setSaved] = useState(false);

  const emojis = MOODS;

  // ✅ Redirect if JWT missing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // Reset the ambient glow when leaving this page
  useEffect(() => () => setAura(null), []);

  // Hide the "saved" note after a few seconds
  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 4000);
    return () => clearTimeout(t);
  }, [saved]);

  // ✅ Helper to update streak
  const updateStreak = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/streak/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("Streak updated:", data);
    } catch (err) {
      console.error("Error updating streak:", err);
    }
  };

  const pick = (index) => {
    setSelectedEmoji(index);
    setAura(emojis[index].color);
  };

  const unpick = () => {
    setSelectedEmoji(null);
    setAura(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEmoji !== null) {
      const feeling = emojis[selectedEmoji].label;
      const note = noteText;
      const now = new Date();

      try {
        const res = await fetch(`${API_BASE}/api/feelingentries`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feeling,
            note,
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
          }),
        });

        if (res.ok) {
          setNoteText("");
          unpick();
          setSaved(true);

          // ✅ Update streak after successful save
          updateStreak();
        }
      } catch (err) {
        console.error("Error submitting feeling:", err);
      }
    }
  };

  const current = selectedEmoji !== null ? emojis[selectedEmoji] : null;

  return (
    <div className="feeling-page">
      <p className="feeling-greeting">{greeting()}, {name}</p>
      <h1 className="heading-1 feeling-title">How are you feeling?</h1>

      {saved && (
        <p className="feeling-saved" role="status">
          Check-in saved. Your streak is up to date.
        </p>
      )}

      {current === null && (
        <div className="emoji-container" role="group" aria-label="Choose a mood">
          {emojis.map((emoji, index) => (
            <button
              type="button"
              key={emoji.label}
              className="emoji-wrapper"
              style={{ "--mood": emoji.color }}
              onClick={() => pick(index)}
              onMouseEnter={() => setAura(emoji.color)}
              onMouseLeave={() => setAura(null)}
              onFocus={() => setAura(emoji.color)}
              onBlur={() => setAura(null)}
            >
              <span className="emoji" aria-hidden="true">{emoji.symbol}</span>
              <span className="emoji-label">{emoji.label}</span>
            </button>
          ))}
        </div>
      )}

      {current !== null && (
        <form onSubmit={handleSubmit} className="note-form" style={{ "--mood": current.color }}>
          <div className="selected-emoji">
            <span className="emoji" aria-hidden="true">{current.symbol}</span>
            <p className="emoji-label">{current.label}</p>
            <button type="button" className="link-btn" onClick={unpick}>
              Pick a different mood
            </button>
          </div>
          <textarea
            className="custom-textarea"
            placeholder={`What makes you feel ${current.label.toLowerCase()}?`}
            aria-label={`What makes you feel ${current.label.toLowerCase()}?`}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <Button type="submit" className="submit-btn">Save check-in</Button>
        </form>
      )}
    </div>
  );
}
