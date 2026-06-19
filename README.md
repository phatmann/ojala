# Ojalá — your guided Spanish coach 🇨🇷📚🎙️

**Ojalá** is a guided Spanish learning web app. You set a goal, take a quick
placement test, and the app builds a **personalized study plan** with lessons
that explain the *why* behind the grammar, lots of different ways to practice,
and real **speaking and listening** practice.

> The app is named after **ojalá** ("I hope / I wish") — the most famous
> trigger of the Spanish subjunctive. It felt fitting, because mastering the
> subjunctive vs. the indicative is exactly what this app is built to help with.

It works on a phone or a computer, and your progress is saved on your device —
no account, no login, nothing to install for everyday use.

---

## What it does (mapped to what you asked for)

- **Guided & goal-driven.** You choose the level you want to reach and how many
  weeks you have. ➜ *Goal screen*
- **It tests you first.** An 18-question placement diagnostic figures out your
  level and pinpoints your weak spots. ➜ *Placement test*
- **It builds a plan.** A week-by-week schedule that front-loads your weak areas
  and gives stronger topics a lighter review. ➜ *Plan*
- **Lessons that explain *why*.** Every lesson has "Why it works" insight boxes,
  conjugation tables, and example sentences you can hear spoken — not just rules
  to memorize. ➜ *Lessons*
- **Lots of ways to practice.** Multiple choice, fill-in-the-blank, conjugation
  drills, translation, build-the-sentence, listening, and speaking. ➜ *Practice*
- **An oral part.** The app **speaks Spanish to you** and **listens to you speak
  back**, then checks your pronunciation. ➜ *Speak*
- **Works for lots of levels.** Content spans Novice → Advanced, and the
  Library lets you study any topic at any time.

### Focus areas built in for this learner

The curriculum leans into the things that are hard when you learned Spanish by
ear (like in Costa Rica) rather than from grammar drills:

- **Past tenses** — preterite vs. imperfect (the "snapshot vs. movie" idea)
- **The future** (and the conditional)
- **Indicative vs. subjunctive** — what "mood" actually means, how to form the
  subjunctive, and the **WEIRDO** triggers for when to use it
  - *(The word you're after is "subjunctive vs. indicative," not "conjunctive."
    A whole lesson explains the difference and clears up that mix-up.)*

---

## Run it

You'll need [Node.js](https://nodejs.org/) 18+.

```bash
npm install      # one time
npm run dev      # start the app, then open the printed http://localhost:5173
```

To build a production version:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built version locally
```

### Heads-up about the speaking feature 🎤

Speaking practice uses your browser's built-in speech tools (the **Web Speech
API**) — they're free and run on your device, no API keys needed.

- **Listening** (the app speaking Spanish) works in most modern browsers.
- **Speaking** (the app hearing you) works best in **Chrome** or **Edge**, and
  needs **microphone permission**. If a browser doesn't support it, the app
  still lets you reveal the sentence, hear it, and self-check.
- You can pick a Spanish accent (Spain, Mexico, US, Argentina) and adjust the
  speaking speed in **Settings**.

---

## How it works (for the curious)

It's a single-page app — **React + TypeScript + Vite** — with **no backend**.
Everything (your goal, plan, mastery, and streak) is stored in your browser's
`localStorage`.

```
src/
  data/         The curriculum: topics, lessons, exercises, placement test
  state/        Scoring/level estimation, plan generation, the app store
  lib/          Speech (TTS + mic), text matching, the tiny router
  components/   Every screen + the exercise engine
  types.ts      Shared types and the ACTFL/AAPL level model
```

The content is plain data, so it's easy to extend: add a topic in
`data/topics.ts`, a lesson in `data/lessons.ts`, and exercises in
`data/exercises.ts`, and it automatically shows up in the Library, the plan,
and practice.

---

¡Mucho ánimo, Liana! Ojalá que te sirva. 🌟
