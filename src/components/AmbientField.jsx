import { useMemo } from 'react';

// Ambient background motion — slow gold motes drifting up with a gentle sway.
// Sacred and alive, never distracting. Sits behind all content.
export default function AmbientField({ count = 34 }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = (i * 31.7) % 100;
        const size = 1 + ((i * 7) % 3);
        const duration = 26 + ((i * 13) % 30); // 26–56s rise
        const delay = -((i * 11) % 50);
        const opacity = 0.12 + ((i * 5) % 5) / 25; // ~0.12–0.28
        const sway = ((i * 17) % 22) - 11; // -11..11px
        // a few warmer, slightly brighter embers
        const ember = i % 9 === 0;
        return { left, size: ember ? size + 1 : size, duration, delay, opacity, sway, ember, key: i };
      }),
    [count]
  );

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {motes.map((m) => (
        <span
          key={m.key}
          style={{
            position: 'absolute',
            left: `${m.left}%`,
            bottom: '-12px',
            width: m.size,
            height: m.size,
            borderRadius: '9999px',
            background: m.ember ? '#E8C97A' : '#C9A84C',
            boxShadow: m.ember ? '0 0 8px rgba(232,201,122,.6)' : 'none',
            '--mote-opacity': m.opacity,
            '--mote-sway': `${m.sway}px`,
            animation: `motedrift ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
