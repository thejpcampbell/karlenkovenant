import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SESSIONS } from '../data/sessions.js';
import { WEEK_BY_N } from '../data/weeks.js';
import { STAGES, STAGE_IDS, stageColor } from '../data/stageMeta.js';
import { ROLES } from '../data/roles.js';
import { useRole } from '../RoleContext.jsx';
import Creed from './Creed.jsx';
import ProgressRing from './ProgressRing.jsx';
import StageRail from './StageRail.jsx';

const SESSION_BY_ID = Object.fromEntries(SESSIONS.map((s) => [s.id, s]));

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Each stage returns an array of reveal blocks (so they stagger uniformly).
function stageBlocks(stageId, stages, color, role) {
  switch (stageId) {
    case 'context':
      return stages.context.paragraphs.map((p, i) => (
        <p key={i} style={{ margin: '0 0 1.15rem', fontSize: '1.2rem', lineHeight: 1.72, color: 'var(--cream)' }}>{p}</p>
      ));

    case 'word':
      return stages.word.map((w, i) => (
        <div key={i} style={{ borderLeft: `4px solid ${color}`, paddingLeft: '1.05rem', margin: '0 0 1.6rem' }}>
          <div className="kicker" style={{ color, fontSize: '0.68rem', marginBottom: 10 }}>{w.ref}</div>
          <p style={{ margin: 0, fontSize: '1.36rem', lineHeight: 1.58, color: 'var(--cream)' }}>{w.text}</p>
          <div className="kicker" style={{ color: 'var(--muted)', fontSize: '0.54rem', marginTop: 10 }}>Christian Standard Bible</div>
        </div>
      ));

    case 'words':
      return stages.words.map((t, i) => (
        <div key={i} style={{ borderLeft: `4px solid ${color}`, paddingLeft: '1.05rem', margin: '0 0 1.7rem' }}>
          <div style={{ fontSize: '1.95rem', color: 'var(--gold-pale)', lineHeight: 1.25 }}>{t.term}</div>
          <div style={{ fontStyle: 'italic', color, fontSize: '1.1rem', marginTop: 4 }}>
            {t.translit}
            <span style={{ color: 'var(--cream-dim)', fontStyle: 'normal' }}> &middot; {t.gloss}</span>
          </div>
          <p style={{ margin: '10px 0 0', fontSize: '1.12rem', lineHeight: 1.74, color: 'var(--cream-dim)' }}>{t.note}</p>
        </div>
      ));

    case 'reflect': {
      const blocks = [];
      if (stages.reflect.lead) {
        blocks.push(
          <p key="lead" style={{ margin: '0 0 1.3rem', fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.5, color: 'var(--gold-pale)' }}>
            {stages.reflect.lead}
          </p>
        );
      }
      stages.reflect.paragraphs.forEach((p, i) =>
        blocks.push(<p key={i} style={{ margin: '0 0 1.15rem', fontSize: '1.2rem', lineHeight: 1.72, color: 'var(--cream)' }}>{p}</p>)
      );
      return blocks;
    }

    case 'talk': {
      const blocks = [];
      const group = (label, qs, mine) => {
        blocks.push(
          <div key={label} className="kicker" style={{ color, fontSize: '0.74rem', marginTop: blocks.length ? '1.7rem' : 0, marginBottom: '0.8rem', opacity: mine ? 1 : 0.7 }}>
            For {label}{mine ? ' · you' : ''}
          </div>
        );
        qs.forEach((q, i) =>
          blocks.push(
            <div key={label + i} style={{ display: 'flex', gap: '0.85rem', margin: '0 0 1.05rem', opacity: mine ? 1 : 0.82 }}>
              <span className="cinzel" style={{ color, fontSize: '1.22rem', flexShrink: 0 }}>{i + 1}</span>
              <p style={{ margin: 0, fontSize: '1.2rem', lineHeight: 1.58, color: 'var(--cream)' }}>{q}</p>
            </div>
          )
        );
      };
      // Your role's questions lead; your partner's stay visible below.
      const groups = [
        { id: 'jp', label: ROLES.jp.name, qs: stages.talk.jp },
        { id: 'ashley', label: ROLES.ashley.name, qs: stages.talk.ashley },
      ];
      if (role === 'ashley') groups.reverse();
      groups.forEach((g) => group(g.label, g.qs, g.id === role));
      return blocks;
    }

    case 'pray': {
      const p = stages.pray;
      const body = p[role] && p[role].paragraphs ? p[role] : p; // husband/wife version, fallback to shared
      const blocks = [];
      blocks.push(
        <div key="anchor" style={{ borderLeft: `4px solid ${color}`, paddingLeft: '1.05rem', margin: '0 0 1.4rem' }}>
          <div className="kicker" style={{ color, fontSize: '0.66rem', marginBottom: 8 }}>{p.anchorRef}</div>
          <p style={{ margin: 0, fontStyle: 'italic', fontSize: '1.14rem', lineHeight: 1.6, color: 'var(--cream-dim)' }}>{p.anchorText}</p>
        </div>
      );
      body.paragraphs.forEach((para, i) =>
        blocks.push(<p key={i} style={{ margin: '0 0 1.15rem', fontSize: '1.2rem', lineHeight: 1.78, color: 'var(--cream)' }}>{para}</p>)
      );
      blocks.push(<p key="amen" className="amen" style={{ textAlign: 'center', fontSize: '1.3rem', margin: '1.5rem 0 0' }}>In Jesus' name, amen.</p>);
      if (body.carry) {
        blocks.push(
          <div key="carry" style={{ marginTop: '1.8rem', padding: '1.1rem 1.15rem', borderRadius: 14, background: 'var(--bg-card)', border: `0.5px solid ${color}44`, fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.66, color: 'var(--cream-dim)' }}>
            {body.carry}
          </div>
        );
      }
      return blocks;
    }
    default:
      return [];
  }
}

export default function SessionPlayer({ sessionId, onBack, isStageDone, setStage, sessionStageCount }) {
  const { role } = useRole();
  const session = SESSION_BY_ID[sessionId];
  const week = WEEK_BY_N[session.week];
  const weekColor = week.color;
  const [idx, setIdx] = useState(0);
  const advanceTimer = useRef(null);

  const stage = STAGES[idx];
  const color = stageColor(stage, weekColor);
  const done = isStageDone(sessionId, stage.id);
  const count = sessionStageCount(sessionId);

  useEffect(() => () => advanceTimer.current && clearTimeout(advanceTimer.current), []);
  // jump to top of content on stage change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [idx]);

  const go = (next) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setIdx((i) => Math.max(0, Math.min(STAGES.length - 1, next)));
  };

  const mark = () => {
    if (done) {
      setStage(sessionId, stage.id, false);
      return;
    }
    setStage(sessionId, stage.id, true);
    if (idx < STAGES.length - 1) {
      advanceTimer.current = setTimeout(() => setIdx((i) => Math.min(STAGES.length - 1, i + 1)), 500);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      {/* Header wash in the active stage color */}
      <motion.div
        key={color}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'fixed', inset: 0, background: `radial-gradient(125% 80% at 50% 0%, ${color}3b, ${color}0d 44%, transparent 72%)`, pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '12px 13px 92px' }}>
        {/* Header */}
        <header style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 12 }}>
            <button onClick={onBack} aria-label="Back to week" style={{ fontSize: '1.4rem', color: 'var(--cream-dim)', minHeight: 44, minWidth: 44 }}>‹</button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="kicker" style={{ color: weekColor, fontSize: '0.55rem' }}>Week {week.n} &middot; {session.title}</div>
              <div className="cinzel" style={{ fontSize: '1.42rem', lineHeight: 1.16, color: 'var(--gold-pale)', marginTop: 3 }}>{session.subtitle}</div>
            </div>
          </div>
          {/* thin progress bar */}
          <div style={{ height: 3, borderRadius: 9999, background: 'rgba(201,168,76,.12)', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${(count / STAGES.length) * 100}%` }} transition={{ duration: 0.5 }} style={{ height: '100%', background: weekColor }} />
          </div>
        </header>

        <StageRail activeIndex={idx} weekColor={weekColor} isStageDone={(id) => isStageDone(sessionId, id)} onJump={go} />

        {/* Stage eyebrow */}
        <div className="kicker" style={{ color, margin: '1.4rem 0 0.6rem', fontSize: '0.84rem', letterSpacing: '0.2em' }}>{stage.label}</div>

        {/* Stage content — line-by-line reveal */}
        <AnimatePresence mode="wait">
          <motion.div key={stage.id} variants={container} initial="hidden" animate="show" style={{ marginTop: '0.8rem' }}>
            {stageBlocks(stage.id, session.stages, color, role).map((block, i) => (
              <motion.div key={i} variants={item}>{block}</motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mark complete */}
        <motion.button
          onClick={mark}
          whileTap={{ scale: 0.97 }}
          className="kicker"
          style={{
            marginTop: '1.6rem', width: '100%', minHeight: 50, borderRadius: 12, fontSize: '0.62rem',
            border: `1px solid ${color}`, background: done ? color : 'transparent', color: done ? '#070910' : color,
            fontWeight: done ? 600 : 400, transition: 'all 0.35s ease', boxShadow: done ? `0 0 16px ${color}55` : 'none',
          }}
        >
          {done ? '✓ Complete' : 'Mark Complete'}
        </motion.button>

        {/* Nav + ring */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.3rem' }}>
          <NavArrow dir="prev" color={color} disabled={idx === 0} onClick={() => go(idx - 1)} />
          <ProgressRing value={count} max={STAGES.length} color={weekColor} size={54} stroke={4}>
            <span className="cinzel" style={{ fontSize: 12, color: 'var(--gold-pale)' }}>{idx + 1}/{STAGES.length}</span>
          </ProgressRing>
          <NavArrow dir="next" color={color} disabled={idx === STAGES.length - 1} onClick={() => go(idx + 1)} />
        </div>

        <Creed />
      </div>
    </div>
  );
}

function NavArrow({ dir, color, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous stage' : 'Next stage'}
      style={{
        fontSize: '1.6rem', color: disabled ? 'var(--muted)' : color, minHeight: 48, minWidth: 48, borderRadius: 12,
        border: `1px solid ${disabled ? 'var(--border)' : `${color}55`}`, background: 'var(--bg-card)',
        opacity: disabled ? 0.4 : 1, transition: 'color .35s, border-color .35s',
      }}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  );
}
