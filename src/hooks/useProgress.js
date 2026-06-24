import { useCallback, useEffect, useState } from 'react';
import { SESSIONS } from '../data/sessions.js';
import { WEEKS } from '../data/weeks.js';
import { STAGE_IDS } from '../data/stageMeta.js';

// Shape: { [sessionId]: { context:true, word:true, ... } }
// Shared across two phones via /api/progress (Vercel KV). Falls back to
// localStorage per phone if KV isn't connected (spec §6). Never auto-resets.
const LOCAL_KEY = 'karlen_covenant_progress_v1';
const SESSION_IDS = SESSIONS.map((s) => s.id);

export function useProgress() {
  const [state, setState] = useState({});
  const [remote, setRemote] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Load once on mount: try the shared store, else fall back to this phone.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/progress');
        if (!res.ok) throw new Error('no kv');
        const data = await res.json();
        if (alive) {
          setState(data || {});
          setRemote(true);
        }
      } catch {
        let local = {};
        try {
          local = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
        } catch {
          local = {};
        }
        if (alive) {
          setState(local);
          setRemote(false);
        }
      } finally {
        if (alive) setLoaded(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const persist = useCallback(
    (next) => {
      if (remote) {
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        }).catch(() => {
          // network blip — keep a local copy so nothing is lost
          try {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
          } catch {}
        });
      } else {
        try {
          localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
        } catch {}
      }
    },
    [remote]
  );

  const setStage = useCallback(
    (sessionId, stageId, value) => {
      setState((prev) => {
        const next = structuredClone(prev);
        next[sessionId] = next[sessionId] || {};
        if (value) next[sessionId][stageId] = true;
        else delete next[sessionId][stageId];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const isStageDone = useCallback(
    (sessionId, stageId) => Boolean(state[sessionId]?.[stageId]),
    [state]
  );

  const sessionStageCount = useCallback(
    (sessionId) => STAGE_IDS.reduce((n, st) => n + (state[sessionId]?.[st] ? 1 : 0), 0),
    [state]
  );

  const sessionDone = useCallback(
    (sessionId) => sessionStageCount(sessionId) === STAGE_IDS.length,
    [sessionStageCount]
  );

  // How many of a week's 3 sessions are fully complete.
  const weekDoneCount = useCallback(
    (weekN) => {
      const wk = WEEKS.find((w) => w.n === weekN);
      if (!wk) return 0;
      return wk.sessions.reduce((n, sid) => n + (sessionDone(sid) ? 1 : 0), 0);
    },
    [sessionDone]
  );

  // Sessions fully complete across the whole study (out of 30).
  const overallDone = useCallback(
    () => SESSION_IDS.reduce((n, sid) => n + (sessionDone(sid) ? 1 : 0), 0),
    [sessionDone]
  );

  const resetAll = useCallback(() => {
    setState(() => {
      const empty = {};
      persist(empty);
      return empty;
    });
  }, [persist]);

  return {
    loaded,
    remote,
    isStageDone,
    setStage,
    sessionStageCount,
    sessionDone,
    weekDoneCount,
    overallDone,
    resetAll,
  };
}
