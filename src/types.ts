// ---------------------------------------------------------------------------
// Core domain types for Ojalá
// ---------------------------------------------------------------------------

/** ACTFL / AAPL proficiency levels, in ascending order. */
export type Level =
  | 'novice-low'
  | 'novice-mid'
  | 'novice-high'
  | 'intermediate-low'
  | 'intermediate-mid'
  | 'intermediate-high'
  | 'advanced-low'
  | 'advanced-mid'
  | 'advanced-high';

export const LEVELS: Level[] = [
  'novice-low',
  'novice-mid',
  'novice-high',
  'intermediate-low',
  'intermediate-mid',
  'intermediate-high',
  'advanced-low',
  'advanced-mid',
  'advanced-high',
];

export const LEVEL_LABELS: Record<Level, string> = {
  'novice-low': 'Novice Low',
  'novice-mid': 'Novice Mid',
  'novice-high': 'Novice High',
  'intermediate-low': 'Intermediate 1 (Low)',
  'intermediate-mid': 'Intermediate 2 (Mid)',
  'intermediate-high': 'Intermediate 3 (High)',
  'advanced-low': 'Advanced 1 (Low)',
  'advanced-mid': 'Advanced 2 (Mid)',
  'advanced-high': 'Advanced 3 (High)',
};

export function levelIndex(l: Level): number {
  return LEVELS.indexOf(l);
}

// ---------------------------------------------------------------------------
// Topics & lessons
// ---------------------------------------------------------------------------

export type TopicCategory =
  | 'foundations'
  | 'past'
  | 'future'
  | 'mood'
  | 'usage';

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  foundations: 'Foundations',
  past: 'Talking about the past',
  future: 'Talking about the future',
  mood: 'Mood: indicative vs. subjunctive',
  usage: 'Word choice & usage',
};

export interface Topic {
  id: string;
  title: string;
  /** Short label for chips / compact UI. */
  shortTitle: string;
  category: TopicCategory;
  /** The level at which this concept is normally introduced. */
  level: Level;
  /** One-line description of what the topic covers. */
  summary: string;
  /** Topic ids that should ideally be studied first. */
  prerequisites: string[];
}

export interface Example {
  es: string;
  en: string;
  /** Optional note explaining the grammar in this specific example. */
  note?: string;
}

export interface ConjugationTable {
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface LessonSection {
  heading?: string;
  /** Lightweight markdown: **bold**, *italic*, `code`, and blank-line paragraphs. */
  body: string;
  examples?: Example[];
  table?: ConjugationTable;
  /** A highlighted "why" insight. */
  why?: string;
}

export interface Lesson {
  topic: string;
  title: string;
  estMinutes: number;
  intro: string;
  sections: LessonSection[];
  keyTakeaways: string[];
}

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'conjugate'
  | 'translate'
  | 'reorder'
  | 'listening'
  | 'speaking';

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  'multiple-choice': 'Multiple choice',
  'fill-blank': 'Fill in the blank',
  conjugate: 'Conjugation',
  translate: 'Translation',
  reorder: 'Build the sentence',
  listening: 'Listening',
  speaking: 'Speaking',
};

interface ExerciseBase {
  id: string;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Why the correct answer is correct — always shown after answering. */
  explanation: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple-choice';
  prompt: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
}

export interface FillBlankExercise extends ExerciseBase {
  type: 'fill-blank';
  /** Sentence containing exactly one "___" placeholder. */
  prompt: string;
  /** English translation shown as context. */
  english?: string;
  /** Hint, e.g. "dar — preterite, nosotros". */
  hint?: string;
  /** Accepted answers (case/accent-insensitive matching is applied). */
  accepted: string[];
}

export interface ConjugateExercise extends ExerciseBase {
  type: 'conjugate';
  verb: string;
  subject: string;
  tense: string;
  accepted: string[];
}

export interface TranslateExercise extends ExerciseBase {
  type: 'translate';
  direction: 'en-es' | 'es-en';
  prompt: string;
  accepted: string[];
}

export interface ReorderExercise extends ExerciseBase {
  type: 'reorder';
  prompt: string;
  english?: string;
  /** Tokens in scrambled order; the correct order is `tokens` as listed here. */
  tokens: string[];
}

export interface ListeningExercise extends ExerciseBase {
  type: 'listening';
  /** Spanish text the app reads aloud. */
  audioText: string;
  /** Question shown after (or while) listening. */
  prompt: string;
  options: string[];
  answer: number;
}

export interface SpeakingExercise extends ExerciseBase {
  type: 'speaking';
  /** What we ask the learner to do (in English). */
  prompt: string;
  /** The Spanish sentence the learner should say. */
  target: string;
  english?: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | ConjugateExercise
  | TranslateExercise
  | ReorderExercise
  | ListeningExercise
  | SpeakingExercise;

// ---------------------------------------------------------------------------
// Placement test
// ---------------------------------------------------------------------------

export interface PlacementQuestion {
  id: string;
  topic: string;
  level: Level;
  prompt: string;
  english?: string;
  options: string[];
  answer: number;
  explanation: string;
}

// ---------------------------------------------------------------------------
// Study plan
// ---------------------------------------------------------------------------

export type SessionKind = 'learn' | 'practice' | 'review' | 'oral';

export const SESSION_KIND_LABELS: Record<SessionKind, string> = {
  learn: 'Learn',
  practice: 'Practice',
  review: 'Review',
  oral: 'Speaking & listening',
};

export interface PlanSession {
  id: string;
  week: number;
  day: number;
  topic: string;
  kind: SessionKind;
  title: string;
  /** Estimated minutes. */
  minutes: number;
}

export interface StudyPlan {
  createdAt: number;
  goalLevel: Level;
  weeks: number;
  daysPerWeek: number;
  startLevel: Level;
  sessions: PlanSession[];
}

// ---------------------------------------------------------------------------
// Progress & persisted state
// ---------------------------------------------------------------------------

export interface TopicProgress {
  /** 0–100 estimate of mastery. */
  mastery: number;
  attempts: number;
  correct: number;
  lessonRead: boolean;
  lastPracticed?: number;
}

export interface AppState {
  version: number;
  onboarded: boolean;
  learnerName?: string;
  goalLevel?: Level;
  weeks?: number;
  daysPerWeek: number;
  startLevel?: Level;
  estimatedLevel?: Level;
  placementDone: boolean;
  plan?: StudyPlan;
  progress: Record<string, TopicProgress>;
  completedSessions: string[];
  streak: { count: number; lastStudyDate?: string };
  voice: { lang: string; rate: number };
}
