import React from "react";
import { LuCheck, LuPlus } from "react-icons/lu";
import '../styles/goalcard.css';

export default function GoalCard({ 
  symbol = '👟', 
  heading = 'Run 1 Km', 
  desc = 'Go for a run in the neighbourhood',
  type = "pending",        // "pending", "suggested", or "recent"
  onComplete,              // handler for tick
  onAdd                    // handler for plus
}) {
  return (
    <div className="goal-box">
      <div className="goal-symbol">{symbol}</div>
      <div className="goal-text">
        <p className="goal-heading">{heading}</p>
        <p className="goal-desc">{desc}</p>
      </div>

      {/* ✅ Action button changes based on section */}
      {type === "pending" && (
        <button type="button" className="goal-tick" onClick={onComplete} aria-label={`Mark "${heading}" complete`}>
          <LuCheck />
        </button>
      )}

      {type === "suggested" && (
        <button type="button" className="goal-add" onClick={onAdd} aria-label={`Add "${heading}" to today`}>
          <LuPlus />
        </button>
      )}

      {/* ✅ If type is "recent", no button is shown */}
    </div>
  );
}
