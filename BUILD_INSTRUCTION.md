# CAMPBELL COVENANT — CLAUDE CODE BUILD INSTRUCTION

Paste this into Claude Code in a fresh project, with both files attached
(CAMPBELL_COVENANT_SPEC_V1.md and sessions.js):

---

Build the Campbell Covenant marriage study site per CAMPBELL_COVENANT_SPEC_V1.md.
The content is final and complete in sessions.js (all 30 sessions, 10 weeks x 3,
six stages each: context, word, words, reflect, talk, pray). Do NOT rewrite,
edit, or "improve" the content. Treat sessions.js as the source of truth and
build the React shell around it exactly as written.

Build order:
1. Scaffold Vite + React + Tailwind. Pull Cinzel + Lora from Google Fonts.
   Set the design tokens from spec section 5 (#070910 base, gold #C9A84C, etc).
2. Build SessionPlayer.jsx as the six-stage player from spec section 3. The
   working interactive model already exists and was approved; match it:
   - top stage rail (6 stages), header washes to active stage color
   - content reveals line by line (staggered fade-up ~120ms)
   - MARK COMPLETE per stage, auto-advance, progress ring + bar
   - prev/next arrows with position counter
   - stage colors fixed: context #85B7EB, word=week color, words #5DCAA5,
     reflect #E8956D, talk #A78BFF, pray #FF8FAB
   - TALK stage splits questions into "FOR JP" (stages.talk.jp) and
     "FOR ASHLEY" (stages.talk.ashley)
   - WORDS stage renders each term with the Hebrew/Greek, transliteration,
     gloss, and note
   - PRAY stage shows the Philippians 4:6 anchor, the prayer paragraphs, the
     gold-italic "In Jesus' name, amen." close, and the carry line
3. Build Home (10-week color map, overall ring X of 30) and WeekScreen
   (3 session cards per week) per spec section 5 and the weeks color map in
   section 2.
4. Wire progress with useProgress + /api/progress + Vercel KV, localStorage
   fallback (spec section 6). Track per-stage, per-session, per-week, overall.
5. Deploy to campbellcovenant.vercel.app. Connect Vercel KV in the dashboard.

Mobile-first. Low-light readable. Footer creed on every session:
"Battle-born and blood-bought. Riding by faith, fighting by grace.
Every mile has meaning."

Do not use localStorage as the primary store if KV is connected. Do not add
content. Do not change the Scripture (it is CSB). Do not alter the original-
language terms (they are lexicon-verified).

---

That's it. Two files in, one paragraph, and it builds.
