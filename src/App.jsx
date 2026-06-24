import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home.jsx';
import WeekScreen from './components/WeekScreen.jsx';
import SessionPlayer from './components/SessionPlayer.jsx';
import RoleSelect from './components/RoleSelect.jsx';
import AmbientField from './components/AmbientField.jsx';
import { RoleProvider } from './RoleContext.jsx';
import { ROLES } from './data/roles.js';
import { useProgress } from './hooks/useProgress.js';

const ROLE_KEY = 'cc_role';

// view: 'home' | 'week' | 'session'
export default function App() {
  const [view, setView] = useState('home');
  const [weekN, setWeekN] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  // Who's on this phone — local to the device, not synced.
  const [role, setRoleState] = useState(() => {
    const r = (typeof localStorage !== 'undefined' && localStorage.getItem(ROLE_KEY)) || null;
    return ROLES[r] ? r : null;
  });
  const setRole = (r) => {
    try {
      if (r) localStorage.setItem(ROLE_KEY, r);
      else localStorage.removeItem(ROLE_KEY);
    } catch {}
    setRoleState(r);
  };

  const {
    loaded,
    remote,
    isStageDone,
    setStage,
    sessionStageCount,
    weekDoneCount,
    overallDone,
    resetAll,
  } = useProgress();

  const openWeek = (n) => { setWeekN(n); setView('week'); };
  const openSession = (id) => { setSessionId(id); setView('session'); };

  const t = { duration: 0.4, ease: 'easeInOut' };

  let screen;
  if (!role) {
    // First: who's on this phone? (remembered per device)
    screen = <RoleSelect onPick={setRole} />;
  } else if (!loaded) {
    // brief hold until first load resolves, so we don't flash empty rings
    screen = (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="kicker" style={{ color: 'var(--muted)' }}>The Marriage Walk</div>
      </div>
    );
  } else {
    screen = (
      <RoleProvider role={role} setRole={setRole}>
    <AnimatePresence mode="wait">
      {view === 'home' && (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
          <Home
            overallDone={overallDone}
            weekDoneCount={weekDoneCount}
            remote={remote}
            onOpenWeek={openWeek}
            onResetAll={resetAll}
          />
        </motion.div>
      )}

      {view === 'week' && (
        <motion.div key="week" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={t}>
          <WeekScreen
            weekN={weekN}
            onBack={() => setView('home')}
            onOpenSession={openSession}
            sessionStageCount={sessionStageCount}
          />
        </motion.div>
      )}

      {view === 'session' && (
        <motion.div key="session" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={t}>
          <SessionPlayer
            sessionId={sessionId}
            onBack={() => setView('week')}
            isStageDone={isStageDone}
            setStage={setStage}
            sessionStageCount={sessionStageCount}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </RoleProvider>
    );
  }

  return (
    <>
      <AmbientField />
      <div style={{ position: 'relative', zIndex: 1 }}>{screen}</div>
    </>
  );
}
