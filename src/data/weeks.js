// The ten-week arc and color map — locked, transcribed verbatim from
// Campbell Covenant Platform Spec v1 §2. Each week holds 3 sessions.
export const WEEKS = [
  { n: 1,  title: 'The Design',             color: '#C9A84C', accentName: 'gold',      sessions: ['w1s1', 'w1s2', 'w1s3'] },
  { n: 2,  title: 'Two Become One',         color: '#E8956D', accentName: 'coral',     sessions: ['w2s1', 'w2s2', 'w2s3'] },
  { n: 3,  title: 'Covenant, Not Contract', color: '#85B7EB', accentName: 'blue',      sessions: ['w3s1', 'w3s2', 'w3s3'] },
  { n: 4,  title: 'Love That Lays Down',    color: '#FF8FAB', accentName: 'rose',      sessions: ['w4s1', 'w4s2', 'w4s3'] },
  { n: 5,  title: 'Strength & Submission',  color: '#A78BFF', accentName: 'violet',    sessions: ['w5s1', 'w5s2', 'w5s3'] },
  { n: 6,  title: 'The Tongue',             color: '#5DCAA5', accentName: 'teal',      sessions: ['w6s1', 'w6s2', 'w6s3'] },
  { n: 7,  title: 'Conflict & Repentance',  color: '#EF9F27', accentName: 'amber',     sessions: ['w7s1', 'w7s2', 'w7s3'] },
  { n: 8,  title: 'One Flesh, One Wallet',  color: '#97C459', accentName: 'green',     sessions: ['w8s1', 'w8s2', 'w8s3'] },
  { n: 9,  title: 'The Marriage Bed',       color: '#D4537E', accentName: 'deep rose', sessions: ['w9s1', 'w9s2', 'w9s3'] },
  { n: 10, title: 'The Long Ride Home',     color: '#7FD9B8', accentName: 'pale teal', sessions: ['w10s1', 'w10s2', 'w10s3'] },
];

export const WEEK_BY_N = Object.fromEntries(WEEKS.map((w) => [w.n, w]));
