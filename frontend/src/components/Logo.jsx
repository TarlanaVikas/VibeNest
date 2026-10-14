import { useId } from "react";

// The VibeNest mark: a glowing orb resting in a nest of three ripples.
export default function Logo({ size = 40, className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="VibeNest"
    >
      <defs>
        <linearGradient id={`${id}-orb`} x1="14" y1="8" x2="34" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFC25A" />
          <stop offset="1" stopColor="#FF5C8A" />
        </linearGradient>
        <linearGradient id={`${id}-nest`} x1="6" y1="24" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF5C8A" />
          <stop offset="1" stopColor="#FF8A3D" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="13" r="5" fill={`url(#${id}-orb)`} />
      <path d="M5 25a19 19 0 0 0 38 0" stroke={`url(#${id}-nest)`} strokeWidth="3" strokeLinecap="round" />
      <path d="M11 25a13 13 0 0 0 26 0" stroke={`url(#${id}-nest)`} strokeWidth="3" strokeLinecap="round" opacity=".7" />
      <path d="M17 25a7 7 0 0 0 14 0" stroke={`url(#${id}-nest)`} strokeWidth="3" strokeLinecap="round" opacity=".42" />
    </svg>
  );
}
