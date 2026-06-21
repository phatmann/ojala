import type { Topic } from '../types';

// The curriculum. Ordering in this array reflects a sensible teaching order;
// plan generation also respects prerequisites and level.
export const TOPICS: Topic[] = [
  // --- Foundations ---------------------------------------------------------
  {
    id: 'present-regular',
    title: 'The Present Tense (regular verbs)',
    shortTitle: 'Present',
    category: 'foundations',
    level: 'novice-high',
    summary: 'Conjugating regular -ar, -er, and -ir verbs in the present.',
    prerequisites: [],
  },
  {
    id: 'ser-estar',
    title: 'Ser vs. Estar',
    shortTitle: 'Ser / Estar',
    category: 'foundations',
    level: 'intermediate-low',
    summary: 'Two verbs for "to be" — permanent identity vs. state and location.',
    prerequisites: ['present-regular'],
  },
  {
    id: 'present-irregular',
    title: 'Stem-changing & irregular present verbs',
    shortTitle: 'Irregulars',
    category: 'foundations',
    level: 'intermediate-low',
    summary: 'e→ie, o→ue, e→i changes and yo-irregular verbs like tener, hacer.',
    prerequisites: ['present-regular'],
  },

  // --- The past ------------------------------------------------------------
  {
    id: 'preterite',
    title: 'The Preterite (completed past)',
    shortTitle: 'Preterite',
    category: 'past',
    level: 'intermediate-mid',
    summary: 'The tense for finished, bounded actions: "I spoke, I went, I ate."',
    prerequisites: ['present-regular'],
  },
  {
    id: 'imperfect',
    title: 'The Imperfect (ongoing past)',
    shortTitle: 'Imperfect',
    category: 'past',
    level: 'intermediate-mid',
    summary: 'The tense for background, habits, and descriptions: "I used to / was -ing."',
    prerequisites: ['present-regular'],
  },
  {
    id: 'preterite-vs-imperfect',
    title: 'Preterite vs. Imperfect — choosing the right past',
    shortTitle: 'Pret. vs. Imp.',
    category: 'past',
    level: 'intermediate-high',
    summary: 'The big one: when an action is a "snapshot" vs. a "movie scene".',
    prerequisites: ['preterite', 'imperfect'],
  },
  {
    id: 'present-perfect',
    title: 'The Present Perfect (he hablado)',
    shortTitle: 'Pres. Perfect',
    category: 'past',
    level: 'intermediate-high',
    summary: '"Have done" — recent past still connected to now, with haber + participle.',
    prerequisites: ['preterite'],
  },

  // --- The future ----------------------------------------------------------
  {
    id: 'future',
    title: 'The Future Tense (hablaré)',
    shortTitle: 'Future',
    category: 'future',
    level: 'intermediate-high',
    summary: 'The simple future plus "ir a + infinitive", and the why behind each.',
    prerequisites: ['present-regular'],
  },
  {
    id: 'conditional',
    title: 'The Conditional (hablaría)',
    shortTitle: 'Conditional',
    category: 'future',
    level: 'advanced-low',
    summary: '"Would" — hypotheticals, politeness, and the future-of-the-past.',
    prerequisites: ['future'],
  },

  // --- Mood: indicative vs. subjunctive -----------------------------------
  {
    id: 'subjunctive-vs-indicative',
    title: 'Indicative vs. Subjunctive — what "mood" actually means',
    shortTitle: 'Mood',
    category: 'mood',
    level: 'intermediate-high',
    summary: 'The core idea: facts and reality vs. wishes, doubt, and the unreal.',
    prerequisites: ['present-regular'],
  },
  {
    id: 'subjunctive-present',
    title: 'Forming the Present Subjunctive',
    shortTitle: 'Form subj.',
    category: 'mood',
    level: 'advanced-low',
    summary: 'The "opposite vowel" rule, the yo-form trick, and irregulars.',
    prerequisites: ['subjunctive-vs-indicative', 'present-irregular'],
  },
  {
    id: 'subjunctive-uses',
    title: 'When to use the Subjunctive (WEIRDO triggers)',
    shortTitle: 'Subj. uses',
    category: 'mood',
    level: 'advanced-low',
    summary: 'Wishes, Emotion, Impersonal, Recommendations, Doubt, Ojalá — and the two-clause test.',
    prerequisites: ['subjunctive-present'],
  },
  {
    id: 'commands',
    title: 'Commands (imperatives)',
    shortTitle: 'Commands',
    category: 'mood',
    level: 'advanced-low',
    summary: 'Telling people what to do — and why most commands borrow subjunctive forms.',
    prerequisites: ['subjunctive-present'],
  },
  {
    id: 'past-subjunctive',
    title: 'The Past Subjunctive & "if" clauses',
    shortTitle: 'Past subj. / si',
    category: 'mood',
    level: 'advanced-mid',
    summary: 'The imperfect subjunctive and contrary-to-fact "Si tuviera…, viajaría" sentences.',
    prerequisites: ['subjunctive-present', 'conditional'],
  },

  // --- Usage ---------------------------------------------------------------
  {
    id: 'por-vs-para',
    title: 'Por vs. Para',
    shortTitle: 'Por / Para',
    category: 'usage',
    level: 'intermediate-high',
    summary: 'Two words for "for": cause/exchange vs. goal/destination.',
    prerequisites: [],
  },

  // --- Conversation & speaking (Advanced) ---------------------------------
  {
    id: 'conversation-everyday',
    title: 'Conversation: everyday questions',
    shortTitle: 'Chat: everyday',
    category: 'conversation',
    level: 'advanced-low',
    summary: 'Answer common questions out loud, in the moment — about you, your day, your plans.',
    prerequisites: [],
  },
  {
    id: 'conversation-narrate',
    title: 'Conversation: telling a story',
    shortTitle: 'Chat: narrate',
    category: 'conversation',
    level: 'advanced-mid',
    summary: 'Narrate past events in connected paragraphs — review of preterite vs. imperfect in real use.',
    prerequisites: ['preterite-vs-imperfect'],
  },
  {
    id: 'conversation-opinions',
    title: 'Conversation: opinions & connectors',
    shortTitle: 'Chat: opinions',
    category: 'conversation',
    level: 'advanced-mid',
    summary: 'Give opinions, agree/disagree, and link ideas with natural connectors.',
    prerequisites: ['subjunctive-uses'],
  },
  {
    id: 'conversation-hypothetical',
    title: 'Conversation: hypotheticals & the unexpected',
    shortTitle: 'Chat: what if',
    category: 'conversation',
    level: 'advanced-high',
    summary: 'Handle "what would you do if…" and react to surprising situations on the spot.',
    prerequisites: ['past-subjunctive'],
  },
];

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);

export function getTopic(id: string): Topic | undefined {
  return TOPIC_BY_ID[id];
}
