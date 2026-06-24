# The Marriage Walk — Campbell Covenant Platform Spec v1
## Claude Code Build Document
> A marriage Bible study for JP and Ashley Campbell. Ten weeks. Thirty sessions. Walked together, one flesh.

---

## 1. OVERVIEW

A single deployed site: a guided marriage Bible study built as a session player.

- **Domain:** `campbellcovenant.vercel.app`
- **Structure:** Home (10-week map) → Week → Session (six-stage player)
- **Audience:** JP and Ashley, studied together, a few times a week, ~30 min per session
- **Aesthetic:** Mirrors Avynn's prayer cycle — black and gold, Cinzel + Lora, low-light readable, sacred and warm

This is built the same way the Avynn platform was built. Content is written and final. The player is a reusable component. Progress is tracked and synced across two phones.

---

## 2. THE STUDY ARC (10 weeks × 3 sessions = 30)

Each week has a theme color (mirrors Avynn's domain-color system). Each week holds 3 sessions on the same theme, different passages.

```
WEEK 1  The Design               #C9A84C  gold
WEEK 2  Two Become One           #E8956D  coral
WEEK 3  Covenant, Not Contract   #85B7EB  blue
WEEK 4  Love That Lays Down      #FF8FAB  rose
WEEK 5  Strength & Submission    #A78BFF  violet
WEEK 6  The Tongue               #5DCAA5  teal
WEEK 7  Conflict & Repentance    #EF9F27  amber
WEEK 8  One Flesh, One Wallet    #97C459  green
WEEK 9  The Marriage Bed         #D4537E  deep rose
WEEK 10 The Long Ride Home       #7FD9B8  pale teal
```

### Session passages (anchor + cross-references)

```
W1  The Design
  S1  Genesis 2:18,24 + Mark 10:6-9        (one flesh, the welding)
  S2  Genesis 1:26-28                       (image of God, male and female)
  S3  Genesis 2:18-25                       (the helper, the naming, no shame)

W2  Two Become One
  S1  Ephesians 5:31-32 + 1 Cor 6:16-17    (the mystery, real union)
  S2  1 Corinthians 7:1-5                   (mutual belonging)
  S3  Song of Songs 2:16; 6:3              (my beloved is mine)

W3  Covenant, Not Contract
  S1  Malachi 2:13-16                       (the wife of your covenant)
  S2  Matthew 19:3-9                        (what God joined)
  S3  Proverbs 2:16-17 + Ruth 1:16-17      (covenant loyalty)

W4  Love That Lays Down
  S1  Ephesians 5:25-30                     (love as Christ loved)
  S2  Philippians 2:3-8                     (the mind of Christ)
  S3  1 Corinthians 13:4-7                  (the standard of love)

W5  Strength & Submission
  S1  Ephesians 5:22-24                     (the wife's charge)
  S2  1 Peter 3:1-7                         (both sides, weaker vessel, co-heirs)
  S3  Colossians 3:18-19 + Titus 2:3-5     (the household order)

W6  The Tongue
  S1  James 3:2-10                          (the tongue, the rudder)
  S2  Ephesians 4:29 + Proverbs 18:21      (words that build)
  S3  Proverbs 15:1; 25:11                  (the soft answer)

W7  Conflict & Repentance
  S1  Ephesians 4:26-32                     (anger, sun going down, forgiveness)
  S2  Matthew 18:21-22 + Colossians 3:13   (seventy times seven)
  S3  Matthew 5:23-24; James 5:16          (go and be reconciled)

W8  One Flesh, One Wallet
  S1  1 Timothy 5:8 + Luke 16:10-13        (provision, faithful in little)
  S2  Proverbs 31:10-31                     (the worthy wife, partnership)
  S3  Hebrews 13:5 + Matthew 6:19-21       (contentment, treasure)

W9  The Marriage Bed
  S1  1 Corinthians 7:1-5 + Hebrews 13:4   (do not deprive, undefiled)
  S2  Proverbs 5:15-19                      (drink from your own cistern)
  S3  Song of Songs 4:9-10                  (delight, exclusivity)

W10 The Long Ride Home
  S1  Revelation 19:6-9                     (the marriage supper of the Lamb)
  S2  Matthew 22:30 + Ecclesiastes 4:9-12  (marriage points past itself)
  S3  1 Corinthians 15:58                   (finishing faithful)
```

---

## 3. THE SESSION PLAYER — SIX STAGES

Every session is identical in structure, themed to its week color. Six stages, navigable by a top rail and prev/next arrows.

```
1  CONTEXT   The setting & story. Who wrote it, to whom, what was happening, why.
2  THE WORD  The passage(s), quoted in CSB. Marked "Christian Standard Bible."
3  WORDS     The original-language word study. 2-4 Hebrew/Greek terms.
4  REFLECT   The teaching. Plain, grounded, carries the word-study terms in.
5  TALK      6 questions. 3 labeled FOR JP, 3 labeled FOR ASHLEY.
6  PRAY      Philippians 4:6 anchor + a written prayer ending "In Jesus' name, amen." in gold italic.
```

### Stage behavior
- Tapping a stage washes the header in that stage's color (radial glow) and recolors the eyebrow text.
- Content stages reveal line by line (staggered fade-up, ~120ms apart).
- Each stage has a MARK COMPLETE button. On complete: button fills the stage color, ring advances, auto-advance to next stage after ~500ms.
- Bottom: progress ring (X of 6), thin progress bar under header, prev/next arrows with "N / 6" counter.
- Stage accent color applies to: kicker label, verse border, word-study card rail, question numbers, prayer border, mark button.

### Stage colors (within every session)
```
CONTEXT  #85B7EB   THE WORD  (week color)
WORDS    #5DCAA5   REFLECT   #E8956D
TALK     #A78BFF   PRAY      #FF8FAB
```
(THE WORD stage uses the week's theme color; the other five are fixed across all sessions for consistency.)

---

## 4. CONTENT RULES

1. **All Scripture in CSB.** Quote it in Christian Standard Bible wording. Label each passage "CHRISTIAN STANDARD BIBLE" beneath it.
2. **Greek and Hebrew MUST be lexicon-verified.** Every original-language term (spelling, transliteration, gloss) is checked against a real lexicon (BDAG/Strong's/HALOT) before it ships. No terms from memory. This is non-negotiable in a faith document.
3. **Questions split 3 and 3.** Three "FOR JP," three "FOR ASHLEY." JP's press on where he keeps score, pulls away, withholds, leads selfishly. Ashley's invite her honesty, her ledger, where she feels one vs. separate.
4. **Every prayer is anchored on Philippians 4:6** and moves the way the verse moves: not anxious, with thanksgiving, requests made known. Four short movements: thanks, confession, requests, thanks ahead of time. Always closes "In Jesus' name, amen." in gold italic.
5. **Voice:** plain, grounded, unflinching, a little dry humor allowed. Teaching voice in the model of a straight-talking pastor. Lands on life-and-death, not just right-and-wrong. No hype, no filler.
6. **Reflection length:** ~5 paragraphs. A real 30-minute sit when combined with the other stages. Not a tract, not a sermon.
7. **Context stage:** ~3 paragraphs. Author, audience, historical situation, and why the passage was said. Put the reader where it was first heard.

---

## 5. DESIGN SYSTEM (mirrors Avynn)

### 5.1 Color & base
```css
--bg-base:    #070910
--bg-card:    rgba(255,255,255,.015)
--border:     rgba(201,168,76,.18)
--gold:       #C9A84C
--gold-light: #E8C97A
--gold-pale:  #F5E6B8
--cream:      #ECE0C2
--cream-dim:  #C8B88A
--muted:      #8A7E64
```

### 5.2 Typography
```
Display: 'Cinzel'  (Google Fonts) — eyebrows, titles, labels, terms, amen
Body:    'Lora'    (Google Fonts) — verses, reflection, questions, prayer
```

### 5.3 Readability
```
Verse:      1.1rem,  line-height 1.82
Reflection: 1.05rem, line-height 1.88
Prayer:     1.06rem, line-height 1.96
```
Mobile-first. Phone in one hand, low light. All tap targets ≥ 48px. Min body text 1.0rem.

### 5.4 Motion
- All transitions 0.4-0.6s, eased.
- Header glow cross-fades on stage change.
- Stage content slides up + scales in.
- Reveal items stagger ~120ms.
- Mark/complete pulses. Ring + bar animate.
- Respect `prefers-reduced-motion`.

### 5.5 Footer creed (every session, small, italic, muted)
```
Battle-born and blood-bought.
Riding by faith, fighting by grace.
Every mile has meaning.
```

---

## 6. PROGRESS SYSTEM

- Per session (6 stages) / per week (3 sessions) / overall (30 sessions).
- **Synced across two phones** via Vercel KV (`@vercel/kv`). Single shared store, key `marriage_walk_progress`.
- API route `/api/progress` (GET returns state object, POST saves it).
- **Fallback:** if KV is not connected, the page silently falls back to `localStorage` per phone and the footer reads "SAVED ON THIS PHONE."
- Home shows overall ring (X of 30). Each week card shows its 3-dot fill. Each session shows its 6-stage ring.
- No auto-reset. Reset only by user hold-to-confirm.

---

## 7. TECH STACK

```
Framework:  React 18 + Vite 5
Animation:  Framer Motion (or CSS transitions — match Avynn)
Styling:    Tailwind + CSS custom properties
Fonts:      Google Fonts (Cinzel + Lora)
Storage:    Vercel KV (shared) with localStorage fallback
Deploy:     Vercel → campbellcovenant.vercel.app
```

### File structure
```
campbell-covenant/
├── src/
│   ├── data/
│   │   ├── sessions.js      <- all 30 sessions, six stages each, FINAL content
│   │   ├── weeks.js         <- 10 weeks: title, color, tagline, session ids
│   │   └── stageMeta.js     <- the 6 stage definitions (label, icon, fixed colors)
│   ├── components/
│   │   ├── Home.jsx         <- 10-week map, overall ring
│   │   ├── WeekScreen.jsx   <- 3 session cards for a week
│   │   ├── SessionPlayer.jsx<- the six-stage player (the core)
│   │   ├── StageRail.jsx
│   │   ├── ProgressRing.jsx
│   │   └── Creed.jsx
│   ├── hooks/
│   │   └── useProgress.js   <- KV fetch/save + localStorage fallback
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── api/
│   └── progress.js          <- Vercel serverless: GET/POST shared state
├── package.json             <- declares @vercel/kv
└── (Vite / Tailwind config)
```

---

## 8. DATA SHAPE (sessions.js)

```javascript
export const SESSIONS = [
  {
    id: 'w1s1',
    week: 1,
    title: 'Session One',
    subtitle: 'What God built, and why.',
    stages: {
      context: { paragraphs: [ /* strings */ ] },
      word: [
        { ref: 'Genesis 2:18, 24', text: 'CSB text...' },
        { ref: 'Mark 10:6-9', text: 'CSB text...' }
      ],
      words: [
        { hebrewOrGreek: 'עֵזֶר כְּנֶגְדּוֹ', translit: 'ezer kenegdo',
          gloss: 'helper corresponding to him', note: '...' }
        // 2-4 entries, LEXICON-VERIFIED
      ],
      reflect: { lead: '...', paragraphs: [ /* ~5 strings */ ] },
      talk: {
        jp:     [ 'q', 'q', 'q' ],
        ashley: [ 'q', 'q', 'q' ]
      },
      pray: {
        anchorRef: 'Philippians 4:6',
        anchorText: 'CSB...',
        paragraphs: [ /* 4 movements */ ],
        carry: 'Carry it into the week: ...'
      }
    }
  },
  // ... 30 total
];
```

---

## 9. BUILD ORDER

1. **Scaffold** Vite + React + Tailwind. Pull Cinzel + Lora. Set the design tokens.
2. **Build SessionPlayer.jsx** from the six-stage model (the working prototype already exists — Session 1 and 2 are built and proven, narrative and Pauline passage). Port that engine.
3. **Write all 30 sessions** into `sessions.js`. Content is the long pole. Greek/Hebrew lexicon-verified per Rule 4.2.
4. **Build Home + WeekScreen** with the 10-week color map and progress rings.
5. **Wire progress** — `useProgress` + `/api/progress` + KV. localStorage fallback.
6. **Deploy** to `campbellcovenant.vercel.app`. Connect Vercel KV in dashboard.

---

## 10. WHAT'S ALREADY DONE

- Six-stage architecture: proven across two passages (Genesis narrative, Ephesians teaching).
- Session 1 (W1S1) and Session 2 (W2S1): written to full depth, all six stages.
- Ten-week arc and color map: locked (Section 2).
- Design system: locked (Section 5), mirrors Avynn.

**Remaining:** write 28 sessions, verify all original-language terms, build the React shell, deploy.

---

## 11. NOTES FOR CLAUDE CODE

- The Greek and Hebrew is the one thing that cannot be wrong. Verify every term against a real lexicon before it ships. If a term can't be verified, cut it rather than guess.
- CSB wording specifically. Do not paraphrase Scripture.
- Match Avynn's quality bar. Same black-and-gold soul, same low-light care, same "this is a family heirloom, not a product" standard.
- Mobile is primary. Two people, one couch, often at night.
- The questions are the heart of the study. Keep them sharp. JP's should cost him something to answer honestly. Ashley's should make room for hers.
- Every prayer closes "In Jesus' name, amen." in gold italic. Always.

---

*Built for JP and Ashley Campbell.*
*Two became one. Every mile has meaning.*
*"Therefore what God has joined together, let no one separate." — Mark 10:9, CSB*
