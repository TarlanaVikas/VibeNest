// Base URL of the VibeNest API.
// Set VITE_API_URL in a .env file (see .env.example) to point at your backend.
const raw = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_BASE = raw.replace(/\/+$/, "");
