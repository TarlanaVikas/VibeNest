import '../styles/navbutton.css';

// variant "nav"    -> sidebar item (icon + label, highlights when active)
// variant "action" -> primary call-to-action pill (Start, Save Goal, ...)
export default function NavButton({
  text = "Button",
  onClick,
  icon: Icon,
  active = false,
  variant = "action",
}) {
  const className = [
    "nav-button",
    `nav-button--${variant}`,
    active ? "is-active" : "",
  ].join(" ").trim();

  return (
    <button
      className={className}
      onClick={onClick}
      type={variant === "nav" ? "button" : undefined}
      aria-current={active ? "page" : undefined}
    >
      {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
      <span>{text}</span>
    </button>
  );
}
