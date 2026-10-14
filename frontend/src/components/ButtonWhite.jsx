import '../styles/button-white.css';
import { IconContext } from "react-icons";

// Secondary (ghost) button
export default function ButtonWhite({ children, onClick, type = "button", className = "", icon: Icon, disabled = false }) {
  return (
    <button className={`btn-white ${className}`} type={type} onClick={onClick} disabled={disabled}>
      <span className="btn-text">{children}</span>
      {Icon && (
        <IconContext.Provider value={{ className: "btn-icon" }}>
          <Icon />
        </IconContext.Provider>
      )}
    </button>
  );
}
