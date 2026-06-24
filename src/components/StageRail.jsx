import { STAGES, stageColor } from '../data/stageMeta.js';

// Top rail of the six stages. Active = filled in stage color, complete = check,
// incomplete = dim outline. THE WORD takes the week color.
export default function StageRail({ activeIndex, weekColor, isStageDone, onJump }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 6,
        scrollbarWidth: 'none',
      }}
    >
      {STAGES.map((stage, i) => {
        const color = stageColor(stage, weekColor);
        const active = i === activeIndex;
        const done = isStageDone(stage.id);
        let style;
        if (active) {
          style = { background: color, color: '#070910', boxShadow: `0 0 12px ${color}88`, border: 'none', fontWeight: 600 };
        } else if (done) {
          style = { background: `${color}cc`, color: '#070910', border: 'none', fontWeight: 600 };
        } else {
          style = { background: 'transparent', color: `${color}cc`, border: `0.5px solid ${color}55`, opacity: 0.85 };
        }
        return (
          <button
            key={stage.id}
            onClick={() => onJump(i)}
            aria-label={stage.label + (done ? ', complete' : '')}
            className="cinzel"
            style={{
              flexShrink: 0,
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.5rem 0.7rem',
              minHeight: 40,
              borderRadius: 9999,
              whiteSpace: 'nowrap',
              transition: 'all 0.35s ease',
              ...style,
            }}
          >
            {done && !active ? '✓ ' : ''}{stage.label}
          </button>
        );
      })}
    </div>
  );
}
