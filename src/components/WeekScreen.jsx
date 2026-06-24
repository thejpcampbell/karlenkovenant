import { motion } from 'framer-motion';
import { WEEK_BY_N } from '../data/weeks.js';
import { SESSIONS } from '../data/sessions.js';
import { STAGE_IDS } from '../data/stageMeta.js';
import ProgressRing from './ProgressRing.jsx';
import Creed from './Creed.jsx';

const SESSION_BY_ID = Object.fromEntries(SESSIONS.map((s) => [s.id, s]));

export default function WeekScreen({ weekN, onBack, onOpenSession, sessionStageCount }) {
  const week = WEEK_BY_N[weekN];
  if (!week) return null;

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      {/* Week color wash behind everything */}
      <div
        aria-hidden
        style={{ position: 'fixed', inset: 0, background: `radial-gradient(125% 72% at 50% 0%, ${week.color}33, ${week.color}0a 46%, transparent 72%)`, pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto', padding: '12px 12px 96px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.3rem' }}>
          <button onClick={onBack} aria-label="Back to all weeks" style={{ fontSize: '1.6rem', color: 'var(--cream-dim)', minHeight: 44, minWidth: 44 }}>
            ‹
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="kicker" style={{ color: week.color, fontSize: '0.72rem', letterSpacing: '0.22em' }}>Week {week.n} of 10</div>
            <h2 className="cinzel" style={{ fontSize: '2.1rem', fontWeight: 600, color: 'var(--gold-pale)', margin: '4px 0 0', lineHeight: 1.08, letterSpacing: '.5px' }}>
              {week.title}
            </h2>
          </div>
        </header>

        {week.sessions.map((sid, i) => {
          const s = SESSION_BY_ID[sid];
          if (!s) return null;
          const count = sessionStageCount(sid);
          const complete = count === STAGE_IDS.length;
          const refs = (s.stages.word || []).map((w) => w.ref);
          const terms = (s.stages.words || []).map((t) => t.translit);
          const lead = s.stages.reflect && s.stages.reflect.lead;
          return (
            <motion.button
              key={sid}
              onClick={() => onOpenSession(sid)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
              whileTap={{ scale: 0.992 }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '1.35rem 1.3rem 1.15rem',
                marginBottom: '1.2rem',
                borderRadius: 22,
                background: `linear-gradient(150deg, ${week.color}29, ${week.color}0d 52%, rgba(255,255,255,0.015))`,
                border: `1px solid ${week.color}${complete ? 'bf' : '5c'}`,
                boxShadow: complete ? `0 0 26px ${week.color}3d` : `0 12px 32px -18px ${week.color}`,
              }}
            >
              {/* Title + progress */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="kicker" style={{ color: week.color, fontSize: '0.72rem', letterSpacing: '0.24em' }}>{s.title}</div>
                  <div className="cinzel" style={{ fontSize: '1.62rem', fontWeight: 600, color: 'var(--gold-pale)', lineHeight: 1.12, marginTop: 5 }}>
                    {s.subtitle}
                  </div>
                </div>
                <ProgressRing value={count} max={STAGE_IDS.length} color={week.color} size={52} stroke={4}>
                  <span className="cinzel" style={{ fontSize: 12, color: 'var(--gold-pale)' }}>{count}/{STAGE_IDS.length}</span>
                </ProgressRing>
              </div>

              {/* Teaser — what you're walking into */}
              {lead && (
                <p style={{ margin: '0.9rem 0 0', fontStyle: 'italic', fontSize: '1.12rem', lineHeight: 1.5, color: 'var(--cream)' }}>
                  {lead}
                </p>
              )}

              {/* Scripture references */}
              {refs.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: '1.05rem' }}>
                  {refs.map((r, k) => (
                    <span
                      key={k}
                      className="cinzel"
                      style={{ fontSize: '0.74rem', letterSpacing: '0.03em', color: 'var(--cream)', background: `${week.color}24`, border: `0.5px solid ${week.color}66`, borderRadius: 9999, padding: '0.34rem 0.74rem' }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              )}

              {/* Original-language terms */}
              {terms.length > 0 && (
                <div style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.96rem', color: week.color }}>
                  {terms.join('  ·  ')}
                </div>
              )}

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.1rem' }}>
                <span className="kicker" style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.18em' }}>Six movements · ~10 min</span>
                <span className="cinzel" style={{ color: week.color, fontSize: '0.98rem' }}>
                  {complete ? 'Revisit' : count > 0 ? 'Continue' : 'Begin'} ›
                </span>
              </div>
            </motion.button>
          );
        })}

        <Creed />
      </div>
    </div>
  );
}
