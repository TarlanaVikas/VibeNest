import { createElement } from 'react';
import Logo from './Logo';
import '../styles/vibenest-card.css';

export default function VibeNestCard({ as = "div", tagline = true }) {
  return (
    <div className="vibenest-card">
      <Logo size={84} className="vibenest-card-mark" />
      {createElement(as, { className: "vibenest-wordmark" }, "VibeNest")}
      {tagline && (
        <p className="vibenest-tagline">
          Check in with how you feel. See the patterns over time.
        </p>
      )}
    </div>
  );
}
