// One source of truth for how each mood looks across the app.
// `color` drives the ambient glow, chart segments and tile accents.
export const MOODS = [
  { symbol: "😀", label: "Happy",     color: "#FFD23F" },
  { symbol: "😐", label: "Neutral",   color: "#B9A3AE" },
  { symbol: "😢", label: "Sad",       color: "#B565C9" },
  { symbol: "😡", label: "Angry",     color: "#FF4B4B" },
  { symbol: "😍", label: "Loved",     color: "#FF5C8A" },
  { symbol: "🤩", label: "Excited",   color: "#FF8A3D" },
  { symbol: "😴", label: "Tired",     color: "#A58D7E" },
  { symbol: "😕", label: "Confused",  color: "#D3A4D6" },
  { symbol: "😌", label: "Relaxed",   color: "#A8DC7A" },
  { symbol: "🥳", label: "Proud",     color: "#F5A524" },
  { symbol: "😲", label: "Surprised", color: "#FF7BC8" },
  { symbol: "😬", label: "Nervous",   color: "#E8845C" },
  { symbol: "🧘", label: "Calm",      color: "#7FE0C3" },
];

export const moodColor = (label) =>
  MOODS.find((m) => m.label === label)?.color ?? "#B9A3AE";

// Sets / clears the ambient glow colour for the whole app.
export function setAura(color) {
  const root = document.documentElement;
  if (color) root.style.setProperty("--aura-mood", color);
  else root.style.removeProperty("--aura-mood");
}
