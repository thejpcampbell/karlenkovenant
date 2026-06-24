// The six-stage session model — locked, from Platform Spec v1 §3.
// THE WORD uses the week's theme color; the other five are fixed across all
// sessions for consistency. `color: 'week'` is the sentinel for "use week color".
export const STAGES = [
  { id: 'context', label: 'Context',  color: '#85B7EB', blurb: 'The setting & story — who wrote it, to whom, what was happening, why.' },
  { id: 'word',    label: 'The Word', color: 'week',    blurb: 'The passage(s), quoted in the Christian Standard Bible.' },
  { id: 'words',   label: 'Words',    color: '#5DCAA5', blurb: 'The original-language word study — 2–4 Hebrew/Greek terms.' },
  { id: 'reflect', label: 'Reflect',  color: '#E8956D', blurb: 'The teaching — plain, grounded, carrying the word-study terms in.' },
  { id: 'talk',    label: 'Talk',     color: '#A78BFF', blurb: 'Six questions — three for each of you.' },
  { id: 'pray',    label: 'Pray',     color: '#FF8FAB', blurb: 'A Philippians 4:6 anchor + a written prayer, closing in gold italic.' },
];

export const STAGE_IDS = STAGES.map((s) => s.id);

// Resolve a stage's display color, substituting the week color for THE WORD.
export function stageColor(stage, weekColor) {
  return stage.color === 'week' ? weekColor : stage.color;
}
