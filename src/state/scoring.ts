import type { Level, PlacementQuestion, TopicProgress } from '../types';
import { LEVELS, levelIndex } from '../types';
import { TOPICS } from '../data/topics';

export interface PlacementResult {
  /** Per-topic mastery 0–100 derived from the diagnostic. */
  masteryByTopic: Record<string, number>;
  /** Overall estimated level. */
  estimatedLevel: Level;
  /** Topics the learner is weakest at (lowest mastery), strongest first weakness. */
  weakest: string[];
  correct: number;
  total: number;
}

/**
 * Score an adaptive placement attempt.
 *
 * `correctById` maps question id → whether it was answered correctly (the
 * adaptive engine grades each question as it goes, across several question
 * types, so we no longer compare raw option indexes here).
 *
 * `ability` is the engine's final ability estimate in level-index space; it
 * sets the overall level, so a true beginner can land at Beginner · Low rather
 * than being pinned to an artificial floor.
 */
export function scorePlacement(
  questions: PlacementQuestion[],
  correctById: Record<string, boolean>,
  ability: number,
): PlacementResult {
  // Group by topic to compute a correctness ratio per topic.
  const byTopic: Record<string, { correct: number; total: number }> = {};
  let correct = 0;
  for (const q of questions) {
    const isCorrect = !!correctById[q.id];
    if (isCorrect) correct++;
    const bucket = (byTopic[q.topic] ??= { correct: 0, total: 0 });
    bucket.total++;
    if (isCorrect) bucket.correct++;
  }

  const masteryByTopic: Record<string, number> = {};
  for (const [topic, { correct: c, total }] of Object.entries(byTopic)) {
    masteryByTopic[topic] = Math.round((c / total) * 100);
  }

  // Overall level comes straight from the adaptive ability estimate, clamped
  // to a valid band (no artificial floor).
  const idx = Math.max(0, Math.min(LEVELS.length - 1, Math.round(ability)));
  const estimated: Level = LEVELS[idx];

  // Weakest topics: lowest mastery first. Only real curriculum topics (those
  // with lessons) are actionable for the plan, so drop 'basics'/'vocab'.
  const realTopics = new Set(TOPICS.map((t) => t.id));
  const weakest = Object.entries(masteryByTopic)
    .filter(([topic]) => realTopics.has(topic))
    .sort((a, b) => a[1] - b[1])
    .map(([topic]) => topic);

  return {
    masteryByTopic,
    estimatedLevel: estimated,
    weakest,
    correct,
    total: questions.length,
  };
}

/**
 * Seed initial per-topic progress from a placement result, so the dashboard
 * and plan reflect what the diagnostic found.
 */
export function seedProgress(
  result: PlacementResult,
): Record<string, TopicProgress> {
  const progress: Record<string, TopicProgress> = {};
  for (const t of TOPICS) {
    const tested = result.masteryByTopic[t.id];
    // For untested topics, estimate from the topic's level vs. the learner's
    // estimated level: at/below their level → assume some familiarity.
    let mastery = tested;
    if (mastery === undefined) {
      const diff = levelIndex(t.level) - levelIndex(result.estimatedLevel);
      mastery = diff <= -1 ? 70 : diff === 0 ? 50 : 25;
    }
    progress[t.id] = {
      mastery,
      attempts: 0,
      correct: 0,
      lessonRead: false,
    };
  }
  return progress;
}

/**
 * Merge a fresh placement result into EXISTING progress (used for retakes), so
 * the learner keeps the practice mastery they've built. For topics the retake
 * actually tested, blend the new estimate with the old; leave the rest as-is.
 */
export function mergeProgress(
  prev: Record<string, TopicProgress>,
  result: PlacementResult,
): Record<string, TopicProgress> {
  const next: Record<string, TopicProgress> = { ...prev };
  for (const t of TOPICS) {
    const tested = result.masteryByTopic[t.id];
    if (tested === undefined) continue; // not re-tested → keep existing
    const existing = prev[t.id];
    if (!existing) {
      next[t.id] = { mastery: tested, attempts: 0, correct: 0, lessonRead: false };
    } else {
      // Weight toward the newer signal, but don't erase prior practice.
      const blended = Math.round(existing.mastery * 0.5 + tested * 0.5);
      next[t.id] = { ...existing, mastery: Math.max(0, Math.min(100, blended)) };
    }
  }
  return next;
}

/** Update a topic's progress after answering a practice exercise. */
export function applyAnswer(
  prev: TopicProgress,
  wasCorrect: boolean,
): TopicProgress {
  const attempts = prev.attempts + 1;
  const correct = prev.correct + (wasCorrect ? 1 : 0);
  // Nudge mastery toward the running accuracy, weighted so it moves steadily.
  const target = wasCorrect ? 100 : 0;
  const mastery = Math.round(prev.mastery + (target - prev.mastery) * 0.18);
  return {
    ...prev,
    attempts,
    correct,
    mastery: Math.max(0, Math.min(100, mastery)),
    lastPracticed: Date.now(),
  };
}
