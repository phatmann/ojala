import { LEVELS, levelIndex, type Level, type PlacementArea, type PlacementQuestion } from '../types';
import { PLACEMENT } from '../data/placement';

// ---------------------------------------------------------------------------
// Adaptive placement engine.
//
// Design goals (from the learner's requests):
//  • Start one to two levels BELOW the chosen goal, then adjust from there.
//  • Ask a WIDE VARIETY of skill areas first (breadth) so we can find what each
//    person struggles with — different people struggle with different things —
//    before NARROWING in near their level and re-probing weak spots.
//  • Work for true beginners: starting low surfaces the English "basics"
//    questions automatically.
//  • Keep it a reasonable length (~10–14 questions) and stop when we've
//    sampled enough.
// ---------------------------------------------------------------------------

const BREADTH_LEN = 7; // first N questions maximize variety of skill areas
const TARGET_LEN = 12; // aim to finish around here
const MAX_LEN = 15; // hard cap
const LEVEL_WINDOW = 2.5; // only ask questions within this many bands of ability

export interface EngineState {
  goal: Level;
  asked: string[];
  /** question id → was it answered correctly */
  correct: Record<string, boolean>;
  areasSeen: Record<string, number>;
  topicWrong: Record<string, number>;
  /** Running ability estimate, in level-index space (0–8, can be fractional). */
  ability: number;
}

export function initEngine(goal: Level): EngineState {
  // Start one to two levels below the goal so it never opens too hard.
  const start = Math.max(0, levelIndex(goal) - 2);
  return {
    goal,
    asked: [],
    correct: {},
    areasSeen: {},
    topicWrong: {},
    ability: start,
  };
}

export function isDone(s: EngineState): boolean {
  if (s.asked.length >= MAX_LEN) return true;
  if (s.asked.length >= TARGET_LEN) return true;
  // Stop early only if we've genuinely run out of suitable questions.
  return nextQuestion(s) === null && s.asked.length > 0;
}

/** Pick the next question, or null if none suitable remain. */
export function nextQuestion(s: EngineState): PlacementQuestion | null {
  const pool = PLACEMENT.filter((q) => !s.asked.includes(q.id));
  if (pool.length === 0) return null;

  const breadth = s.asked.length < BREADTH_LEN;

  let best: PlacementQuestion | null = null;
  let bestScore = -Infinity;

  for (const q of pool) {
    const dist = Math.abs(levelIndex(q.level) - s.ability);
    // Prefer questions near the current ability estimate.
    let score = -dist;

    const areaSeen = s.areasSeen[q.area] ?? 0;
    if (breadth) {
      // Strongly reward unseen skill areas to maximize variety up front.
      score -= areaSeen * 5;
      // Outside the window is heavily penalized but not impossible.
      if (dist > LEVEL_WINDOW) score -= 6;
    } else {
      // Narrowing: lightly discourage repeats, and re-probe weak topics.
      score -= areaSeen * 0.75;
      score += (s.topicWrong[q.topic] ?? 0) * 1.5;
      if (dist > LEVEL_WINDOW) score -= 4;
    }

    // A little noise so retakes aren't identical.
    score += Math.random() * 0.4;

    if (score > bestScore) {
      bestScore = score;
      best = q;
    }
  }
  return best;
}

/** Record an answer and update the ability estimate. Returns a new state. */
export function record(
  s: EngineState,
  q: PlacementQuestion,
  wasCorrect: boolean,
): EngineState {
  const asked = [...s.asked, q.id];
  const n = asked.length;

  // Up–down staircase: step shrinks as the test progresses so the estimate
  // settles. Dampened to avoid overshooting on a single lucky/unlucky answer.
  const step = Math.max(0.4, 1.25 - n * 0.07) * 0.75;
  let ability = s.ability + (wasCorrect ? step : -step);
  ability = Math.max(0, Math.min(LEVELS.length - 1, ability));

  return {
    ...s,
    asked,
    ability,
    correct: { ...s.correct, [q.id]: wasCorrect },
    areasSeen: { ...s.areasSeen, [q.area]: (s.areasSeen[q.area] ?? 0) + 1 },
    topicWrong: {
      ...s.topicWrong,
      [q.topic]: (s.topicWrong[q.topic] ?? 0) + (wasCorrect ? 0 : 1),
    },
  };
}

export function askedQuestions(s: EngineState): PlacementQuestion[] {
  return s.asked
    .map((id) => PLACEMENT.find((q) => q.id === id))
    .filter((q): q is PlacementQuestion => !!q);
}

/** Distinct skill areas covered so far, for the results summary. */
export function areasCovered(s: EngineState): PlacementArea[] {
  return Object.keys(s.areasSeen) as PlacementArea[];
}

export const PLACEMENT_TARGET_LEN = TARGET_LEN;
