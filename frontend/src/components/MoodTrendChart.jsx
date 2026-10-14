import React, { useEffect, useRef, useState } from "react";
import { API_BASE } from "../config";
import { Chart } from "chart.js/auto";
import { CHART_COLORS } from "../theme/chartTheme";
import "../styles/moodTrendChart.css";

export default function MoodTrendChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const token = localStorage.getItem("token");

  const [trendData, setTrendData] = useState({ days: [], high: [], low: [], zen: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchWeeklyFeelings = async () => {
      try {
        const days = [];
        const high = [];
        const low = [];
        const zen = [];

        // Loop through past 7 days
        for (let i = 0; i < 7; i++) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const isoDate = d.toISOString().split("T")[0];

          const res = await fetch(`${API_BASE}/api/dailystats/${isoDate}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Request failed: ${res.status} ${res.statusText} - ${errText}`);
          }

          const stats = await res.json();

          days.unshift(`${d.getDate()}/${d.getMonth() + 1}`); // keep chronological order

          let highCount = 0, lowCount = 0, zenCount = 0;
          (stats.feelings || []).forEach(f => {
            if (["Happy","Loved","Excited","Proud","Surprised"].includes(f.label)) {
              highCount += f.count;
            } else if (["Sad","Angry","Tired","Confused","Nervous"].includes(f.label)) {
              lowCount += f.count;
            } else if (["Neutral","Relaxed","Calm"].includes(f.label)) {
              zenCount += f.count;
            }
          });

          high.unshift(highCount);
          low.unshift(lowCount);
          zen.unshift(zenCount);
        }

        setTrendData({ days, high, low, zen });
        setError(null);
      } catch (err) {
        console.error("Error fetching weekly feelings:", err);
        setError(err.message);
        setTrendData({
          days: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
          high: [0,0,0,0,0,0,0],
          low: [0,0,0,0,0,0,0],
          zen: [0,0,0,0,0,0,0]
        });
      }
    };

    fetchWeeklyFeelings();
  }, [token]);

  useEffect(() => {
    if (!trendData.days.length || error) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: trendData.days,
        datasets: [
          { label: "High moods", data: trendData.high, borderColor: CHART_COLORS.high, backgroundColor: CHART_COLORS.high, tension: 0.4, borderWidth: 2.5, pointRadius: 3, pointHoverRadius: 6 },
          { label: "Low moods", data: trendData.low, borderColor: CHART_COLORS.low, backgroundColor: CHART_COLORS.low, tension: 0.4, borderWidth: 2.5, pointRadius: 3, pointHoverRadius: 6 },
          { label: "Zen moods", data: trendData.zen, borderColor: CHART_COLORS.zen, backgroundColor: CHART_COLORS.zen, tension: 0.4, borderWidth: 2.5, pointRadius: 3, pointHoverRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            enabled: true,   // ✅ still show stats on hover
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}`;
              }
            }
          }
        }
      }
    });

    return () => chartInstanceRef.current?.destroy();
  }, [trendData, error]);

  return (
    <div className="mood-trend-card-new">
      <h2>Mood trend, past 7 days</h2>
      {error ? (
        <p className="inline-error" role="alert">Could not load your trend. {error}</p>
      ) : (
        <div className="chart-box">
          <canvas ref={chartRef} className="mood-trend-canvas-new" />
        </div>
      )}
    </div>
  );
}

