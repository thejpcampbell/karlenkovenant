import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROLES } from '../data/roles.js';
import Creed from './Creed.jsx';

function Door({ role, index, onPick }) {
  const [hover, setHover] = useState(false);
  const a = role.accent;
  return (
    <motion.button
      onClick={() => onPick(role.id)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.28 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '2rem 0.9rem',
        borderRadius: 24,
        background: `linear-gradient(165deg, ${a}30, ${a}0d 52%, rgba(255,255,255,0.012))`,
        border: `1px solid ${a}${hover ? 'cc' : '59'}`,
        boxShadow: hover ? `0 20px 52px -18px ${a}, 0 0 30px ${a}40` : `0 12px 34px -20px ${a}`,
        transition: 'box-shadow .4s, border-color .4s',
      }}
    >
      {/* monogram badge */}
      <span
        style={{
          width: 66, height: 66, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: `${a}1f`, border: `1px solid ${a}66`, boxShadow: `0 0 18px ${a}33`,
        }}
      >
        <span className="cinzel" style={{ fontSize: '1.8rem', color: a, lineHeight: 1 }}>{role.name[0]}</span>
      </span>
      <span className="cinzel" style={{ fontSize: '1.95rem', fontWeight: 600, color: a, letterSpacing: '.5px', lineHeight: 1.05, textAlign: 'center' }}>
        {role.name}
      </span>
      <span style={{ fontStyle: 'italic', fontSize: '0.98rem', color: 'var(--cream-dim)' }}>{role.label}</span>
      <span className="kicker" style={{ marginTop: '0.35rem', fontSize: '0.6rem', color: `${a}dd`, letterSpacing: '0.22em' }}>Begin ›</span>
    </motion.button>
  );
}

export default function RoleSelect({ onPick }) {
  const couple = `${ROLES.jp.name} & ${ROLES.ashley.name}`;
  return (
    <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden' }}>
      {/* aurora wash — previews both accents */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(80% 55% at 16% 6%, ${ROLES.jp.accent}29, transparent 60%), radial-gradient(85% 58% at 90% 94%, ${ROLES.ashley.accent}24, transparent 62%)`,
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1, minHeight: '100dvh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', maxWidth: 620, margin: '0 auto',
          padding: 'calc(2rem + env(safe-area-inset-top)) calc(14px + env(safe-area-inset-right)) calc(2rem + env(safe-area-inset-bottom)) calc(14px + env(safe-area-inset-left))',
        }}
      >
        {/* Brand */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '1.7rem' }}>
          <div className="kicker" style={{ color: 'var(--gold)' }}>The Marriage Walk</div>
          <h1 className="cinzel" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--gold-pale)', margin: '8px 0 6px', letterSpacing: '1px', lineHeight: 1.05, textShadow: '0 0 26px rgba(201,168,76,.22)' }}>
            {couple}
          </h1>
          <div style={{ fontStyle: 'italic', color: 'var(--cream-dim)', fontSize: '1.04rem' }}>
            Ten Weeks &middot; Thirty Sessions &middot; One Flesh
          </div>
          <div style={{ width: 64, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', margin: '1.3rem auto 0' }} />
        </motion.div>

        {/* Prompt */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }} style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
          <div className="cinzel" style={{ fontSize: '1.45rem', color: 'var(--gold-pale)' }}>Who&rsquo;s walking?</div>
          <div style={{ fontSize: '0.92rem', color: 'var(--muted)', marginTop: 5 }}>
            Choose who&rsquo;s on this phone &mdash; your progress stays shared.
          </div>
        </motion.div>

        <div style={{ display: 'flex', gap: '0.9rem', width: '100%' }} className="doors">
          <Door role={ROLES.jp} index={0} onPick={onPick} />
          <Door role={ROLES.ashley} index={1} onPick={onPick} />
        </div>

        <Creed />
      </div>
    </div>
  );
}
