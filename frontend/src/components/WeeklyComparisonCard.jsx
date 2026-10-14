import React from "react";
import "../styles/weeklyComparisonCard.css";

export default function WeeklyComparisonCard({
  title = "Weekly Comparison",
  currentWeek = 10,
  lastWeek = 8,
  metric = "Goals",
  isPositive = "true" // controls mood logic
}) {
  const difference = currentWeek - lastWeek;

  let percentageChange = 0;
  let arrow = "~";
  let arrowColor = "var(--ink-2)";

  if (currentWeek === 0 || lastWeek === 0 || difference === 0) {
    // Neutral case
    percentageChange = 0;
    arrow = "~";
    arrowColor = "var(--ink-2)";
  } else {
    percentageChange = Math.round((difference / lastWeek) * 100);

    if (difference > 0) {
      arrow = "▲";
      if (isPositive === "true") {
        arrowColor = "var(--good)"; // Good moods increase = green
      } else {
        arrowColor = "var(--bad)";   // Bad moods increase = red
      }
    } else {
      arrow = "▼";
      if (isPositive === "true") {
        arrowColor = "var(--bad)";   // Good moods decrease = red
      } else {
        arrowColor = "var(--good)"; // Bad moods decrease = green
      }
    }
  }

  return (
    <div className="weekly-comparison-card">
      <h3 className="card-heading">{title}</h3>
      <div className="card-row">
        <div className="card-left">
          <p>This week: <strong>{currentWeek}</strong> {metric}</p>
          <p>Last week: <strong>{lastWeek}</strong> {metric}</p>
        </div>
        <div className="card-right" style={{ color: arrowColor }}>
          {arrow} {Math.abs(percentageChange)}%
        </div>
      </div>
    </div>
  );
}
