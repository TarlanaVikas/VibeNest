import {
  LuSmilePlus,
  LuBookOpen,
  LuWind,
  LuHeadphones,
  LuTarget,
  LuListChecks,
  LuTimer,
  LuChartLine,
  LuLogOut,
} from "react-icons/lu";
import '../styles/sidebar.css';
import Logo from './Logo';
import NavButton from './NavButton';

const ITEMS = [
  { key: "Feeling Page", text: "Check-in", icon: LuSmilePlus },
  { key: "Journal", text: "Journal", icon: LuBookOpen },
  { key: "Breathe", text: "Breathe", icon: LuWind },
  { key: "Soundscape", text: "Soundscape", icon: LuHeadphones },
  { key: "SetGoal", text: "Set goal", icon: LuTarget },
  { key: "Activity", text: "Activity", icon: LuListChecks },
  { key: "Timer", text: "Timer", icon: LuTimer },
  { key: "Insight", text: "Insights", icon: LuChartLine },
];

export default function Sidebar({ selected, onSelect }) {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar-brand">
      <button
        type="button"
        className="sidebar-logo"
        onClick={() => onSelect("Feeling Page")}
        aria-label="VibeNest, back to check-in"
      >
        <Logo size={34} />
        <span className="sidebar-wordmark">VibeNest</span>
      </button>

      <nav className="nav-buttons" aria-label="Main">
        {ITEMS.map(({ key, text, icon }) => (
          <NavButton
            key={key}
            variant="nav"
            text={text}
            icon={icon}
            active={selected === key}
            onClick={() => onSelect(key)}
          />
        ))}
      </nav>

      <button type="button" className="sidebar-logout" onClick={logOut}>
        <LuLogOut aria-hidden="true" />
        <span>Log out</span>
      </button>
    </aside>
  );
}
