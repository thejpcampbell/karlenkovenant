import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { WEEKS } from '../data/weeks.js';
import { ROLES } from '../data/roles.js';
import { useRole } from '../RoleContext.jsx';
import ProgressRing from './ProgressRing.jsx';
import Creed from './Creed.jsx';

function WeekCard({ week, index, doneCount, onOpen }) {
  const complete = doneCount >= week.sessions.length;
  return (
    <motion.button
      onClick={() => onOpen(week.n)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.99 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        textAlign: 'left',
        padding: '1.2rem 1.2rem',
        marginBottom: '0.85rem',
        borderRadius: 16,
        background: `linear-gradient(135deg, ${week.color}29, ${week.color}0d 55%, rgba(255,255,255,0.015))`,
        border: `1px solid ${week.color}${complete ? 'bf' : '66'}`,
        boxShadow: complete ? `0 0 22px ${week.color}3a` : `0 8px 24px -16px ${week.color}`,
        transition: 'border-color .4s, box-shadow .4s',
      }}
    >
      <span className="cinzel" style={{ fontSize: '0.86rem', letterSpacing: '0.16em', color: week.color, width: 64, flexShrink: 0 }}>
        WK {week.n}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="cinzel" style={{ display: 'block', fontSize: '1.28rem', fontWeight: 600, color: 'var(--gold-pale)', letterSpacing: '.3px' }}>
          {week.title}
        </span>
      </span>
      {/* 3-dot session fill */}
      <span style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
        {week.sessions.map((_, i) => (
          <span
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: '9999px',
              background: i < doneCount ? week.color : 'transparent',
              border: `1px solid ${week.color}${i < doneCount ? '' : '77'}`,
              boxShadow: i < doneCount ? `0 0 8px ${week.color}` : 'none',
            }}
          />
        ))}
      </span>
    </motion.button>
  );
}

export default function Home({ overallDone, weekDoneCount, remote, onOpenWeek, onResetAll }) {
  const total = 30;
  const done = overallDone();
  const { role, setRole } = useRole();
  const me = ROLES[role];

  // hold-to-reset
  const timer = useRef(null);
  const [holding, setHolding] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const startHold = () => {
    setHolding(true);
    timer.current = setTimeout(() => {
      setHolding(false);
      setConfirm(true);
    }, 700);
  };
  const cancelHold = () => {
    setHolding(false);
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto', padding: 'calc(18px + env(safe-area-inset-top)) calc(12px + env(safe-area-inset-right)) calc(92px + env(safe-area-inset-bottom)) calc(12px + env(safe-area-inset-left))' }}>
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <div className="kicker" style={{ color: 'var(--gold)' }}>The Marriage Walk</div>
        <h1 className="cinzel" style={{ fontSize: '2rem', fontWeight: 500, color: 'var(--gold-pale)', letterSpacing: '1.5px', margin: '10px 0 4px', textShadow: '0 0 24px rgba(201,168,76,.18)' }}>
          Keith &amp; Leanne
        </h1>
        <div style={{ fontStyle: 'italic', color: 'var(--cream-dim)', fontSize: '1.02rem' }}>
          Ten Weeks &middot; Thirty Sessions &middot; One Flesh
        </div>
        {me && (
          <button
            onClick={() => setRole(null)}
            className="kicker"
            style={{ marginTop: 12, fontSize: '0.5rem', color: me.accent, border: `0.5px solid ${me.accent}55`, borderRadius: 9999, padding: '0.35rem 0.8rem', minHeight: 32 }}
          >
            Walking as {me.name}
          </button>
        )}
      </header>

      {/* Overall ring — press & hold to reset */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
        <button
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          aria-label={`${done} of ${total} sessions complete. Press and hold to reset all progress.`}
          title="Press and hold to reset all progress"
          style={{ borderRadius: '9999px', transform: holding ? 'scale(.95)' : 'scale(1)', transition: 'transform .2s' }}
        >
          <ProgressRing value={done} max={total} size={140} stroke={6}>
            <div className="cinzel" style={{ fontSize: 30, color: 'var(--gold-pale)' }}>{done}</div>
            <div style={{ fontSize: 13, color: 'var(--cream-dim)', letterSpacing: '1px' }}>of {total}</div>
          </ProgressRing>
        </button>
      </div>

      <div>
        {WEEKS.map((w, i) => (
          <WeekCard key={w.n} week={w} index={i} doneCount={weekDoneCount(w.n)} onOpen={onOpenWeek} />
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: 26 }}>
        <div className="kicker" style={{ color: 'var(--muted)', fontSize: '0.55rem' }}>
          {remote ? 'SYNCS TO BOTH PHONES' : 'SAVED ON THIS PHONE'}
        </div>
        <Creed />
      </footer>

      {confirm && (
        <div
          onClick={() => setConfirm(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(7,9,16,.85)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 360, background: '#11141d', border: '1px solid var(--border)', borderRadius: 18, padding: '1.8rem 1.4rem', textAlign: 'center' }}>
            <h3 className="cinzel" style={{ color: 'var(--gold-pale)', fontSize: '1.2rem', margin: '0 0 .7rem' }}>Reset all progress?</h3>
            <p style={{ color: 'var(--cream-dim)', fontSize: '.95rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
              This clears every stage across all 30 sessions. It can't be undone.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              <button className="kicker" onClick={() => { onResetAll(); setConfirm(false); }} style={{ minHeight: 48, borderRadius: 12, border: '1px solid #D4537E', background: '#D4537E', color: '#070910', fontWeight: 600 }}>
                Reset Everything
              </button>
              <button className="kicker" onClick={() => setConfirm(false)} style={{ minHeight: 48, borderRadius: 12, border: '1px solid var(--border)', color: 'var(--cream-dim)' }}>
                Keep My Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
