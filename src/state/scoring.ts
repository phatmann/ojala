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
 * Score a placement attempt. `answers` maps question id → chosen option index.
 */
export function scorePlacement(
  questions: PlacementQuestion[],
  answers: Record<string, number>,
): PlacementResult {
  // Group questions by topic and compute correctness ratio per topic.
  const byTopic: Record<string, { correct: number; total: number }> = {};
  let correct = 0;
  for (const q of questions) {
    const chosen = answers[q.id];
    const isCorrect = chosen === q.answer;
    if (isCorrect) correct++;
    const bucket = (byTopic[q.topic] ??= { correct: 0, total: 0 });
    bucket.total++;
    if (isCorrect) bucket.correct++;
  }

  const masteryByTopic: Record<string, number> = {};
  for (const [topic, { correct: c, total }] of Object.entries(byTopic)) {
    masteryByTopic[topic] = Math.round((c / total) * 100);
  }

  // Estimate level: for each level band, average mastery of its topics that
  // were tested. The estimated level is the highest band the learner still
  // handles reasonably well (>= 60%).
  const levelScores: Partial<Record<Level, number[]>> = {};
  for (const t of TOPICS) {
    const m = masteryByTopic[t.id];
    if (m === undefined) continue;
    (levelScores[t.level] ??= []).push(m);
  }

  let estimated: Level = 'novice-high';
  for (const level of LEVELS) {
    const scores = levelScores[level];
    if (!scores || scores.length === 0) continue;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (avg >= 60) {
      estimated = level;
    } else {
      // First band they struggle with — stop climbing.
      break;
    }
  }

  // Weakest topics: lowest mastery first (ties broken by curriculum order).
  const weakest = Object.entries(masteryByTopic)
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
