import React, { useState, useEffect, useRef } from "react";
import { API_BASE } from "../config";
import "../styles/breathe.css";
import NavButton from "../components/NavButton";
import { MOODS, setAura } from "../theme/moods";

const CALM = MOODS.find((m) => m.label === "Calm").color;

export default function Breathe() {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedSound, setSelectedSound] = useState("No Sound");
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("inhale"); // inhale/exhale
  const [audioFiles, setAudioFiles] = useState({});
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // ✅ Check token immediately and fetch audio files
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // redirect if no token
      return;
    }

    fetch(`${API_BASE}/api/timeraudio`, {
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
        if (data && Array.isArray(data)) {
          const mapping = {};
          data.forEach((a) => {
            mapping[a.name] = a.url;
          });
          setAudioFiles(mapping);
        }
      })
      .catch((err) => console.error("Error fetching audio links:", err));
  }, []);

  // Tint the ambient glow a calm green while a session is running
  useEffect(() => {
    setAura(isRunning ? CALM : null);
    return () => setAura(null);
  }, [isRunning]);

  // ✅ Helper to update streak
  const updateStreak = () => {
    fetch(`${API_BASE}/api/streak/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Streak updated:", data))
      .catch((err) => console.error("Error updating streak:", err));
  };

  const handleDurationClick = (duration) => setSelectedDuration(duration);
  const handleSoundClick = (sound) => setSelectedSound(sound);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const handleStart = () => {
    if (!selectedDuration) return;
    setPhase("inhale");
    setIsRunning(true);

    if (selectedSound && selectedSound !== "No Sound" && audioFiles[selectedSound]) {
      audioRef.current = new Audio(audioFiles[selectedSound]);
      audioRef.current.loop = true;
      audioRef.current.play();
    }

    const totalMinutes = parseInt(selectedDuration);
    const totalMs = totalMinutes * 60 * 1000;
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      setPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));

      if (Date.now() - startTime >= totalMs) {
        clearInterval(timerRef.current);
        setIsRunning(false);
        stopAudio();

        // ✅ Update streak only when breathing session finishes
        updateStreak();
      }
    }, 12000); // 12s inhale/exhale cycle
  };

  // End a session early (does not count toward the streak)
  const handleEnd = () => {
    clearInterval(timerRef.current);
    stopAudio();
    setIsRunning(false);
    setPhase("inhale");
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div className="breathe-page">
      {!isRunning && (
        <div className="page-head">
          <h1 className="page-title">Breathe</h1>
          <p className="breathe-desc">Choose a duration and a soundscape to begin your relaxation.</p>
        </div>
      )}

      {!isRunning && (
        <>
          <div className="duration-buttons" role="group" aria-label="Duration">
            {["5", "10", "15", "20"].map((d) => (
              <button
                key={d}
                className={`duration-btn ${selectedDuration === d ? "active" : ""}`}
                onClick={() => handleDurationClick(d)}
                aria-pressed={selectedDuration === d}
              >
                <strong>{d}</strong>
                <span>min</span>
              </button>
            ))}
          </div>

          <div className="sound-buttons" role="group" aria-label="Soundscape">
            {["No Sound", ...Object.keys(audioFiles)].map((s) => (
              <button
                key={s}
                className={`sound-btn ${selectedSound === s ? "active" : ""}`}
                onClick={() => handleSoundClick(s)}
                aria-pressed={selectedSound === s}
              >
                {s}
              </button>
            ))}
          </div>

          <div
            className={`start-btn-wrapper ${selectedDuration ? "" : "is-disabled"}`}
            onClick={handleStart}
          >
            <NavButton text="Start" />
          </div>
          {!selectedDuration && <p className="breathe-hint">Pick a duration to begin.</p>}
        </>
      )}

      {isRunning && (
        <div className="breathing-stage">
          <div className={`breathing-circle ${phase}`}>
            <span>{phase === "inhale" ? "Inhale" : "Exhale"}</span>
          </div>
          <button type="button" className="end-btn" onClick={handleEnd}>
            End session
          </button>
        </div>
      )}
    </div>
  );
}
