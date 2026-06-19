import type { Level, PlanSession, StudyPlan, TopicProgress } from '../types';
import { levelIndex } from '../types';
import { TOPICS } from '../data/topics';
import { exercisesForTopic } from '../data/exercises';

// Teaching-order priority by category, so a generated plan reads sensibly.
const CATEGORY_PRIORITY: Record<string, number> = {
  foundations: 0,
  past: 1,
  future: 2,
  mood: 3,
  usage: 4,
};

interface GenerateArgs {
  goalLevel: Level;
  startLevel: Level;
  weeks: number;
  daysPerWeek: number;
  progress: Record<string, TopicProgress>;
}

/**
 * Build a guided, ordered study plan.
 *
 * Strategy:
 *  - Select every topic introduced at or below the goal level.
 *  - Order them by curriculum sense (category, then level, then prerequisites).
 *  - Give weaker / newer topics a fuller treatment (learn + practice + oral);
 *    give topics the learner already handles a lighter review.
 *  - Distribute the resulting sessions evenly across the chosen weeks/days.
 */
export function generatePlan(args: GenerateArgs): StudyPlan {
  const { goalLevel, startLevel, weeks, daysPerWeek, progress } = args;
  const goalIdx = levelIndex(goalLevel);

  // 1. Candidate topics: anything up to and including the goal level.
  const candidates = TOPICS.filter((t) => levelIndex(t.level) <= goalIdx);

  // 2. Order them.
  const ordered = topologicalCurriculumOrder(candidates.map((t) => t.id));

  // 3. Build sessions per topic based on current mastery.
  const sessions: Omit<PlanSession, 'week' | 'day'>[] = [];
  for (const topicId of ordered) {
    const topic = TOPICS.find((t) => t.id === topicId)!;
    const mastery = progress[topicId]?.mastery ?? 50;
    const hasOral = exercisesForTopic(topicId).some((e) => e.type === 'speaking');

    if (mastery < 55) {
      // Weak or new — full treatment.
      sessions.push(mk(topicId, 'learn', `Learn: ${topic.shortTitle}`, 12));
      sessions.push(mk(topicId, 'practice', `Practice: ${topic.shortTitle}`, 10));
      sessions.push(mk(topicId, 'practice', `Practice: ${topic.shortTitle} (mixed)`, 10));
      if (hasOral) sessions.push(mk(topicId, 'oral', `Speak: ${topic.shortTitle}`, 8));
    } else if (mastery < 80) {
      // Shaky — a refresher plus practice.
      sessions.push(mk(topicId, 'learn', `Review: ${topic.shortTitle}`, 8));
      sessions.push(mk(topicId, 'practice', `Practice: ${topic.shortTitle}`, 10));
      if (hasOral) sessions.push(mk(topicId, 'oral', `Speak: ${topic.shortTitle}`, 8));
    } else {
      // Solid — a light review to keep it warm.
      sessions.push(mk(topicId, 'review', `Quick review: ${topic.shortTitle}`, 6));
    }
  }

  // 4. Distribute across the calendar.
  const totalSlots = Math.max(1, weeks * daysPerWeek);
  const perSlot = Math.ceil(sessions.length / totalSlots);
  const placed: PlanSession[] = sessions.map((s, i) => {
    const slot = Math.floor(i / perSlot);
    const week = Math.floor(slot / daysPerWeek) + 1;
    const day = (slot % daysPerWeek) + 1;
    return { ...s, week: Math.min(week, weeks), day };
  });

  return {
    createdAt: Date.now(),
    goalLevel,
    startLevel,
    weeks,
    daysPerWeek,
    sessions: placed,
  };
}

let seq = 0;
function mk(
  topic: string,
  kind: PlanSession['kind'],
  title: string,
  minutes: number,
): Omit<PlanSession, 'week' | 'day'> {
  return { id: `s${seq++}`, topic, kind, title, minutes };
}

/**
 * Order topic ids so prerequisites come first, then by category priority,
 * then by introduction level. A light topological pass over prerequisites.
 */
function topologicalCurriculumOrder(ids: string[]): string[] {
  const set = new Set(ids);
  const byId = new Map(TOPICS.map((t) => [t.id, t]));

  const baseSort = (a: string, b: string) => {
    const ta = byId.get(a)!;
    const tb = byId.get(b)!;
    const ca = CATEGORY_PRIORITY[ta.category] - CATEGORY_PRIORITY[tb.category];
    if (ca !== 0) return ca;
    const la = levelIndex(ta.level) - levelIndex(tb.level);
    if (la !== 0) return la;
    return ta.title.localeCompare(tb.title);
  };

  const sorted = [...ids].sort(baseSort);
  const result: string[] = [];
  const placed = new Set<string>();

  const visit = (id: string, guard: Set<string>) => {
    if (placed.has(id) || guard.has(id)) return;
    guard.add(id);
    const t = byId.get(id);
    if (t) {
      for (const pre of t.prerequisites) {
        if (set.has(pre)) visit(pre, guard);
      }
    }
    if (!placed.has(id)) {
      placed.add(id);
      result.push(id);
    }
    guard.delete(id);
  };

  for (const id of sorted) visit(id, new Set());
  return result;
}

export function planProgress(
  plan: StudyPlan,
  completed: string[],
): { done: number; total: number; pct: number } {
  const done = plan.sessions.filter((s) => completed.includes(s.id)).length;
  const total = plan.sessions.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
