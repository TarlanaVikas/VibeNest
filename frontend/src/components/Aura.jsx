// Ambient glow that sits behind every page. Its colour follows the mood
// picked on the check-in screen (see setAura in theme/moods.js).
export default function Aura() {
  return (
    <div className="aura" aria-hidden="true">
      <i className="aura-blob aura-one" />
      <i className="aura-blob aura-two" />
      <i className="aura-blob aura-three" />
    </div>
  );
}
