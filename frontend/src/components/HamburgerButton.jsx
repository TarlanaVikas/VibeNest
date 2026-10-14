import { LuMenu, LuX } from "react-icons/lu";
import '../styles/hamburgerbutton.css';

export default function HamburgerButton({ onClick, open = false }) {
  return (
    <button
      type="button"
      className="hamburger-container"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      {open ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
    </button>
  );
}
