import type { Exercise } from '../types';

// A varied bank of exercises. Each topic has several types so practice never
// feels repetitive: multiple choice, fill-in-the-blank, conjugation drills,
// translation, sentence building, listening, and speaking.

export const EXERCISES: Exercise[] = [
  // =========================================================================
  // PRESENT REGULAR
  // =========================================================================
  {
    id: 'pr-1', topic: 'present-regular', type: 'conjugate', difficulty: 1,
    verb: 'hablar', subject: 'nosotros', tense: 'present',
    accepted: ['hablamos'],
    explanation: '-ar verbs take -amos in the nosotros form: habl- + amos.',
  },
  {
    id: 'pr-2', topic: 'present-regular', type: 'fill-blank', difficulty: 1,
    prompt: 'Ellos ___ en una casa grande.', english: 'They live in a big house.',
    hint: 'vivir — present, ellos', accepted: ['viven'],
    explanation: '-ir verbs take -en in the ellos form: viv- + en = viven.',
  },
  {
    id: 'pr-3', topic: 'present-regular', type: 'multiple-choice', difficulty: 2,
    prompt: 'Which form correctly completes: "Yo ___ café cada mañana."',
    options: ['bebo', 'bebes', 'bebe', 'bebemos'], answer: 0,
    explanation: 'For yo, -er verbs end in -o: beb- + o = bebo.',
  },
  {
    id: 'pr-4', topic: 'present-regular', type: 'speaking', difficulty: 2,
    prompt: 'Say in Spanish: "We study Spanish every day."',
    target: 'Estudiamos español todos los días',
    english: 'We study Spanish every day.',
    explanation: '"We study" = estudiamos (nosotros, -ar). No word for "do".',
  },

  // =========================================================================
  // SER vs ESTAR
  // =========================================================================
  {
    id: 'se-1', topic: 'ser-estar', type: 'multiple-choice', difficulty: 2,
    prompt: 'Choose: "La sopa ___ muy caliente ahora mismo."',
    options: ['es', 'está'], answer: 1,
    explanation: 'A current, temporary condition (how the soup is right now) → estar.',
  },
  {
    id: 'se-2', topic: 'ser-estar', type: 'multiple-choice', difficulty: 2,
    prompt: 'Choose: "Mi hermana ___ médica."',
    options: ['es', 'está'], answer: 0,
    explanation: 'Occupation/identity (the DOCTOR mnemonic) → ser.',
  },
  {
    id: 'se-3', topic: 'ser-estar', type: 'fill-blank', difficulty: 3,
    prompt: 'La fiesta ___ en casa de Marta.', english: 'The party is (takes place) at Marta\'s house.',
    hint: 'ser or estar?', accepted: ['es'],
    explanation: 'Events "take place" with ser, even though it feels like location. (For the location of a *thing*, you would use estar.)',
  },
  {
    id: 'se-4', topic: 'ser-estar', type: 'multiple-choice', difficulty: 3,
    prompt: 'Which means "She is ready"?',
    options: ['Ella es lista', 'Ella está lista'], answer: 1,
    explanation: 'estar lista = ready (a state). ser lista = clever (identity).',
  },
  {
    id: 'se-5', topic: 'ser-estar', type: 'speaking', difficulty: 3,
    prompt: 'Say in Spanish: "I am tired today."',
    target: 'Estoy cansada hoy', english: 'I am tired today.',
    explanation: 'A temporary condition → estar: estoy cansada/cansado.',
  },

  // =========================================================================
  // PRESENT IRREGULAR
  // =========================================================================
  {
    id: 'pi-1', topic: 'present-irregular', type: 'conjugate', difficulty: 2,
    verb: 'poder', subject: 'yo', tense: 'present', accepted: ['puedo'],
    explanation: 'o→ue when the stem is stressed: pod- → puedo.',
  },
  {
    id: 'pi-2', topic: 'present-irregular', type: 'conjugate', difficulty: 2,
    verb: 'tener', subject: 'yo', tense: 'present', accepted: ['tengo'],
    explanation: 'tener is yo-irregular: tengo (and then stem-changes: tienes, tiene…).',
  },
  {
    id: 'pi-3', topic: 'present-irregular', type: 'multiple-choice', difficulty: 2,
    prompt: 'Why does nosotros NOT stem-change ("queremos", not "quieremos")?',
    options: [
      'Because the stress falls on the ending, not the stem',
      'Because nosotros is plural',
      'It is just an exception to memorize',
    ], answer: 0,
    explanation: 'Stem changes follow the stress. In nosotros the stress is on the ending, so the stem stays calm — the "boot" shape.',
  },
  {
    id: 'pi-4', topic: 'present-irregular', type: 'fill-blank', difficulty: 2,
    prompt: 'Yo ___ la tarea por la noche.', english: 'I do the homework at night.',
    hint: 'hacer — present, yo', accepted: ['hago'],
    explanation: 'hacer is yo-irregular: hago.',
  },

  // =========================================================================
  // PRETERITE
  // =========================================================================
  {
    id: 'pt-1', topic: 'preterite', type: 'conjugate', difficulty: 2,
    verb: 'hablar', subject: 'yo', tense: 'preterite', accepted: ['hablé'],
    explanation: 'Regular -ar preterite yo form: habl- + é = hablé.',
  },
  {
    id: 'pt-2', topic: 'preterite', type: 'conjugate', difficulty: 3,
    verb: 'tener', subject: 'yo', tense: 'preterite', accepted: ['tuve'],
    explanation: 'Irregular stem tuv- + special ending -e (no accent): tuve.',
  },
  {
    id: 'pt-3', topic: 'preterite', type: 'fill-blank', difficulty: 2,
    prompt: 'Ayer (nosotros) ___ al cine.', english: 'Yesterday we went to the movies.',
    hint: 'ir — preterite, nosotros', accepted: ['fuimos'],
    explanation: 'ir and ser share preterite forms: fuimos. "Ayer" signals a completed event.',
  },
  {
    id: 'pt-4', topic: 'preterite', type: 'multiple-choice', difficulty: 3,
    prompt: 'Why is "Viví en Costa Rica diez años" preterite, not imperfect?',
    options: [
      'Because the period is viewed as completed and bounded (start to finish)',
      'Because ten years is a long time',
      'Because it has a number in it',
    ], answer: 0,
    explanation: 'Duration does not decide the tense — "doneness" does. The living is presented as a finished, bounded whole.',
  },
  {
    id: 'pt-5', topic: 'preterite', type: 'reorder', difficulty: 3,
    prompt: 'Build: "Suddenly, someone knocked on the door."',
    english: 'Suddenly, someone knocked on the door.',
    tokens: ['De', 'repente', 'alguien', 'tocó', 'la', 'puerta'],
    explanation: '"De repente" + a single completed event → preterite (tocó).',
  },
  {
    id: 'pt-6', topic: 'preterite', type: 'speaking', difficulty: 3,
    prompt: 'Say in Spanish: "I ate at eight o\'clock."',
    target: 'Comí a las ocho', english: 'I ate at eight.',
    explanation: 'A completed event at a point in time → preterite: comí.',
  },

  // =========================================================================
  // IMPERFECT
  // =========================================================================
  {
    id: 'im-1', topic: 'imperfect', type: 'conjugate', difficulty: 2,
    verb: 'jugar', subject: 'yo', tense: 'imperfect', accepted: ['jugaba'],
    explanation: 'Regular -ar imperfect: jug- + -aba = jugaba ("I used to play").',
  },
  {
    id: 'im-2', topic: 'imperfect', type: 'conjugate', difficulty: 3,
    verb: 'ser', subject: 'nosotros', tense: 'imperfect', accepted: ['éramos'],
    explanation: 'ser is one of only three imperfect irregulars: éramos.',
  },
  {
    id: 'im-3', topic: 'imperfect', type: 'fill-blank', difficulty: 2,
    prompt: '___ las tres de la tarde.', english: 'It was three in the afternoon.',
    hint: 'ser — imperfect, time', accepted: ['eran'],
    explanation: 'Telling time in the past is always imperfect: "Eran las tres."',
  },
  {
    id: 'im-4', topic: 'imperfect', type: 'multiple-choice', difficulty: 2,
    prompt: 'Choose the imperfect signal word.',
    options: ['todos los días', 'ayer', 'de repente', 'anoche'], answer: 0,
    explanation: '"todos los días" (every day) signals a habit → imperfect. The others mark completed events.',
  },
  {
    id: 'im-5', topic: 'imperfect', type: 'speaking', difficulty: 3,
    prompt: 'Say in Spanish: "As a child, I used to play in the park."',
    target: 'De niña jugaba en el parque', english: 'As a girl, I used to play in the park.',
    explanation: 'A childhood habit/description → imperfect: jugaba.',
  },

  // =========================================================================
  // PRETERITE vs IMPERFECT  (priority)
  // =========================================================================
  {
    id: 'pvi-1', topic: 'preterite-vs-imperfect', type: 'multiple-choice', difficulty: 3,
    prompt: 'Choose: "Mientras yo ___ (estudiar), sonó el teléfono."',
    options: ['estudiaba', 'estudié'], answer: 0,
    explanation: 'The ongoing background action ("was studying") → imperfect; the interrupting event (sonó) is preterite.',
  },
  {
    id: 'pvi-2', topic: 'preterite-vs-imperfect', type: 'multiple-choice', difficulty: 3,
    prompt: 'Choose: "Anoche ___ (ver) una película y luego me dormí."',
    options: ['veía', 'vi'], answer: 1,
    explanation: 'A completed event in a sequence ("anoche", then "luego") → preterite: vi.',
  },
  {
    id: 'pvi-3', topic: 'preterite-vs-imperfect', type: 'multiple-choice', difficulty: 4,
    prompt: 'Which sentence means "I MET María (for the first time)"?',
    options: ['Conocía a María', 'Conocí a María'], answer: 1,
    explanation: 'conocer in the preterite = the moment of meeting; in the imperfect (conocía) = already knew her.',
  },
  {
    id: 'pvi-4', topic: 'preterite-vs-imperfect', type: 'fill-blank', difficulty: 4,
    prompt: 'Era de noche y ___ (llover) cuando llegamos.',
    english: 'It was night and it was raining when we arrived.',
    hint: 'llover — background description', accepted: ['llovía'],
    explanation: 'Weather/background description → imperfect (llovía); the event "llegamos" is preterite.',
  },
  {
    id: 'pvi-5', topic: 'preterite-vs-imperfect', type: 'multiple-choice', difficulty: 4,
    prompt: '"No quise ir" means…',
    options: ['I didn\'t want to go (ongoing reluctance)', 'I refused to go (a decisive act)'],
    answer: 1,
    explanation: 'querer in the preterite (negative) = refused; the imperfect "no quería" = ongoing reluctance.',
  },
  {
    id: 'pvi-6', topic: 'preterite-vs-imperfect', type: 'speaking', difficulty: 4,
    prompt: 'Say in Spanish: "I was eating when you called."',
    target: 'Comía cuando llamaste', english: 'I was eating when you called.',
    explanation: 'Action in progress (comía, imperfect) interrupted by an event (llamaste, preterite).',
  },

  // =========================================================================
  // PRESENT PERFECT
  // =========================================================================
  {
    id: 'pp-1', topic: 'present-perfect', type: 'fill-blank', difficulty: 2,
    prompt: 'Hoy (yo) ___ estudiado mucho.', english: 'Today I have studied a lot.',
    hint: 'haber — present, yo', accepted: ['he'],
    explanation: '"He estudiado" — haber (he) + participle. "Hoy" is an open time frame → present perfect.',
  },
  {
    id: 'pp-2', topic: 'present-perfect', type: 'multiple-choice', difficulty: 3,
    prompt: 'Which is correct for "I studied a lot yesterday"?',
    options: ['He estudiado mucho ayer', 'Estudié mucho ayer'], answer: 1,
    explanation: '"Ayer" is a closed time frame, so use the preterite (estudié), not the present perfect.',
  },
  {
    id: 'pp-3', topic: 'present-perfect', type: 'conjugate', difficulty: 3,
    verb: 'hacer', subject: 'yo', tense: 'present perfect', accepted: ['he hecho'],
    explanation: 'haber (he) + irregular participle hecho = "he hecho" (I have done/made).',
  },
  {
    id: 'pp-4', topic: 'present-perfect', type: 'speaking', difficulty: 3,
    prompt: 'Ask in Spanish: "Have you ever tried ceviche?"',
    target: '¿Alguna vez has probado el ceviche?',
    english: 'Have you ever tried ceviche?',
    explanation: 'Life experience → present perfect: has probado.',
  },

  // =========================================================================
  // FUTURE
  // =========================================================================
  {
    id: 'fu-1', topic: 'future', type: 'conjugate', difficulty: 2,
    verb: 'hablar', subject: 'yo', tense: 'future', accepted: ['hablaré'],
    explanation: 'Future endings attach to the whole infinitive: hablar + é = hablaré.',
  },
  {
    id: 'fu-2', topic: 'future', type: 'conjugate', difficulty: 3,
    verb: 'tener', subject: 'yo', tense: 'future', accepted: ['tendré'],
    explanation: 'Irregular future stem tendr- + é = tendré (same stem as the conditional).',
  },
  {
    id: 'fu-3', topic: 'future', type: 'multiple-choice', difficulty: 3,
    prompt: 'What does "¿Dónde estará Liana?" most naturally mean?',
    options: [
      'Where will Liana be (later)?',
      'Where could Liana be (right now)? / Where do you suppose she is?',
    ], answer: 1,
    explanation: 'The simple future can express probability/supposition about the present: "Where do you suppose she is?"',
  },
  {
    id: 'fu-4', topic: 'future', type: 'fill-blank', difficulty: 2,
    prompt: 'Mañana (nosotros) ___ a la playa. (ir a + inf.)',
    english: 'Tomorrow we are going to go to the beach.',
    hint: 'ir a + infinitive, nosotros', accepted: ['vamos a ir'],
    explanation: 'Near, planned future uses "ir a + infinitive": vamos a ir.',
  },
  {
    id: 'fu-5', topic: 'future', type: 'speaking', difficulty: 3,
    prompt: 'Say in Spanish: "Someday I will travel all over Latin America."',
    target: 'Algún día viajaré por toda Latinoamérica',
    english: 'Someday I will travel all over Latin America.',
    explanation: 'A prediction/promise → simple future: viajaré.',
  },

  // =========================================================================
  // CONDITIONAL
  // =========================================================================
  {
    id: 'co-1', topic: 'conditional', type: 'conjugate', difficulty: 3,
    verb: 'gustar', subject: 'a mí (me)', tense: 'conditional', accepted: ['gustaría'],
    explanation: '"Me gustaría" — conditional for polite wishes: gustar + ía.',
  },
  {
    id: 'co-2', topic: 'conditional', type: 'conjugate', difficulty: 3,
    verb: 'poder', subject: 'tú', tense: 'conditional', accepted: ['podrías'],
    explanation: 'Same irregular stem as the future (podr-) + conditional ending: podrías.',
  },
  {
    id: 'co-3', topic: 'conditional', type: 'multiple-choice', difficulty: 3,
    prompt: 'Why does "Dijo que llegaría tarde" use the conditional?',
    options: [
      'It is the "future seen from a past moment" (future-of-the-past)',
      'Because "dijo" is past',
      'Because it is a polite request',
    ], answer: 0,
    explanation: 'From the past point "dijo", his arrival was still ahead — a future-of-the-past, expressed with the conditional.',
  },
  {
    id: 'co-4', topic: 'conditional', type: 'speaking', difficulty: 3,
    prompt: 'Say politely in Spanish: "I would like a coffee, please."',
    target: 'Me gustaría un café, por favor',
    english: 'I would like a coffee, please.',
    explanation: 'Conditional softens a request: "Me gustaría…" is more polite than "Quiero…".',
  },

  // =========================================================================
  // SUBJUNCTIVE vs INDICATIVE  (priority)
  // =========================================================================
  {
    id: 'svi-1', topic: 'subjunctive-vs-indicative', type: 'multiple-choice', difficulty: 3,
    prompt: 'Choose: "Sé que ella ___ (venir) hoy."',
    options: ['viene', 'venga'], answer: 0,
    explanation: '"Sé que…" asserts a fact (knowing) → indicative: viene.',
  },
  {
    id: 'svi-2', topic: 'subjunctive-vs-indicative', type: 'multiple-choice', difficulty: 3,
    prompt: 'Choose: "Dudo que ella ___ (venir) hoy."',
    options: ['viene', 'venga'], answer: 1,
    explanation: '"Dudo que…" expresses doubt → the action is not asserted as fact → subjunctive: venga.',
  },
  {
    id: 'svi-3', topic: 'subjunctive-vs-indicative', type: 'multiple-choice', difficulty: 4,
    prompt: 'Why is it "Quiero descansar" (infinitive), not "Quiero que descanse"?',
    options: [
      'Because the subject does not change (I want — I rest)',
      'Because querer never takes the subjunctive',
      'Because descansar is irregular',
    ], answer: 0,
    explanation: 'With the same subject, Spanish uses an infinitive. A different subject ("Quiero que TÚ descanses") would trigger the subjunctive.',
  },
  {
    id: 'svi-4', topic: 'subjunctive-vs-indicative', type: 'multiple-choice', difficulty: 4,
    prompt: 'What is the difference between "Aunque es caro" and "Aunque sea caro"?',
    options: [
      'es = stated as fact (it IS expensive); sea = hypothetical (even IF it be)',
      'There is no difference',
      'sea is simply incorrect',
    ], answer: 0,
    explanation: 'The mood marks the speaker\'s stance: indicative asserts a fact, subjunctive leaves it hypothetical/unconfirmed.',
  },
  {
    id: 'svi-5', topic: 'subjunctive-vs-indicative', type: 'speaking', difficulty: 4,
    prompt: 'Say in Spanish: "I hope (that) you rest."',
    target: 'Espero que descanses', english: 'I hope that you rest.',
    explanation: 'A wish + new subject + que → subjunctive: descanses.',
  },

  // =========================================================================
  // SUBJUNCTIVE — FORM
  // =========================================================================
  {
    id: 'sf-1', topic: 'subjunctive-present', type: 'conjugate', difficulty: 3,
    verb: 'hablar', subject: 'tú', tense: 'present subjunctive', accepted: ['hables'],
    explanation: 'yo form "hablo" → drop -o → habl- + opposite-vowel ending -es = hables.',
  },
  {
    id: 'sf-2', topic: 'subjunctive-present', type: 'conjugate', difficulty: 4,
    verb: 'tener', subject: 'yo', tense: 'present subjunctive', accepted: ['tenga'],
    explanation: 'Start from yo "tengo" → teng- → tenga. The irregular stem comes along automatically.',
  },
  {
    id: 'sf-3', topic: 'subjunctive-present', type: 'conjugate', difficulty: 4,
    verb: 'ser', subject: 'él', tense: 'present subjunctive', accepted: ['sea'],
    explanation: 'ser is one of the six DISHES irregulars: sea.',
  },
  {
    id: 'sf-4', topic: 'subjunctive-present', type: 'multiple-choice', difficulty: 3,
    prompt: 'For -ar verbs, the present subjunctive endings use which vowel?',
    options: ['e (the "opposite" vowel)', 'a (the same as the indicative)'],
    answer: 0,
    explanation: '-ar verbs flip to e-endings (hable), -er/-ir verbs flip to a-endings (coma).',
  },
  {
    id: 'sf-5', topic: 'subjunctive-present', type: 'fill-blank', difficulty: 4,
    prompt: 'Es importante que tú ___ (estudiar) más.',
    english: 'It is important that you study more.',
    hint: 'estudiar → present subjunctive, tú', accepted: ['estudies'],
    explanation: 'estudio → estudi- + e-endings → estudies.',
  },

  // =========================================================================
  // SUBJUNCTIVE — USES
  // =========================================================================
  {
    id: 'su-1', topic: 'subjunctive-uses', type: 'multiple-choice', difficulty: 4,
    prompt: 'Choose: "No creo que ___ (tener) razón."',
    options: ['tiene', 'tenga'], answer: 1,
    explanation: 'Negating "creer" turns belief into doubt → subjunctive: tenga.',
  },
  {
    id: 'su-2', topic: 'subjunctive-uses', type: 'multiple-choice', difficulty: 4,
    prompt: 'Choose: "Cuando ___ (terminar) la tarea, te llamo." (it isn\'t done yet)',
    options: ['termino', 'termine'], answer: 1,
    explanation: 'After "cuando", a not-yet-real future event takes the subjunctive: termine.',
  },
  {
    id: 'su-3', topic: 'subjunctive-uses', type: 'fill-blank', difficulty: 3,
    prompt: 'Ojalá que ___ (tener, tú) razón.', english: 'I hope you are right.',
    hint: 'Ojalá always triggers the subjunctive', accepted: ['tengas'],
    explanation: 'Ojalá ("I hope") is the ultimate subjunctive trigger — the app is even named after it. tengo → tengas.',
  },
  {
    id: 'su-4', topic: 'subjunctive-uses', type: 'multiple-choice', difficulty: 4,
    prompt: 'Which WEIRDO category does "Te recomiendo que..." belong to?',
    options: ['R — Recommendation/request', 'D — Doubt', 'E — Emotion'],
    answer: 0,
    explanation: 'Recommending/suggesting/requesting that someone do something triggers the subjunctive (the R in WEIRDO).',
  },
  {
    id: 'su-5', topic: 'subjunctive-uses', type: 'speaking', difficulty: 4,
    prompt: 'Say in Spanish: "It is possible that it will rain tomorrow."',
    target: 'Es posible que llueva mañana',
    english: 'It is possible that it will rain tomorrow.',
    explanation: 'Impersonal expression of possibility → subjunctive: llueva.',
  },
  {
    id: 'su-6', topic: 'subjunctive-uses', type: 'reorder', difficulty: 4,
    prompt: 'Build: "I am glad that you are here."',
    english: 'I am glad that you are here.',
    tokens: ['Me', 'alegro', 'de', 'que', 'estés', 'aquí'],
    explanation: 'Emotion (alegrarse) + que + new subject → subjunctive: estés.',
  },

  // =========================================================================
  // COMMANDS
  // =========================================================================
  {
    id: 'cm-1', topic: 'commands', type: 'multiple-choice', difficulty: 3,
    prompt: 'Negative tú command of "hablar"?',
    options: ['no hablas', 'no hables', 'no habla'], answer: 1,
    explanation: 'Negative tú commands use the subjunctive form: no hables.',
  },
  {
    id: 'cm-2', topic: 'commands', type: 'fill-blank', difficulty: 3,
    prompt: '¡___ (venir, tú) aquí!', english: 'Come here!',
    hint: 'irregular affirmative tú command', accepted: ['ven'],
    explanation: 'venir has an irregular affirmative tú command: ven.',
  },
  {
    id: 'cm-3', topic: 'commands', type: 'multiple-choice', difficulty: 4,
    prompt: 'Where do pronouns go in "Don\'t worry" (No te preocupes)?',
    options: ['Before the verb (negative command)', 'Attached to the end'],
    answer: 0,
    explanation: 'Negative commands: pronouns go before the verb. Affirmative commands: attach them to the end (Levántate).',
  },
  {
    id: 'cm-4', topic: 'commands', type: 'speaking', difficulty: 3,
    prompt: 'Tell a friend in Spanish: "Get up!"',
    target: 'Levántate', english: 'Get up!',
    explanation: 'Affirmative tú command with attached reflexive pronoun + accent: Levántate.',
  },

  // =========================================================================
  // POR vs PARA
  // =========================================================================
  {
    id: 'pp2-1', topic: 'por-vs-para', type: 'multiple-choice', difficulty: 2,
    prompt: 'Choose: "Este regalo es ___ ti."',
    options: ['por', 'para'], answer: 1,
    explanation: 'Recipient/destination of the gift → para.',
  },
  {
    id: 'pp2-2', topic: 'por-vs-para', type: 'multiple-choice', difficulty: 2,
    prompt: 'Choose: "Gracias ___ tu ayuda."',
    options: ['por', 'para'], answer: 0,
    explanation: 'Reason/motivation ("because of") → por.',
  },
  {
    id: 'pp2-3', topic: 'por-vs-para', type: 'fill-blank', difficulty: 3,
    prompt: 'Estudio ___ aprender. (in order to)', english: 'I study in order to learn.',
    hint: '"in order to" → which one?', accepted: ['para'],
    explanation: 'Purpose / "in order to" → para.',
  },
  {
    id: 'pp2-4', topic: 'por-vs-para', type: 'multiple-choice', difficulty: 3,
    prompt: 'Choose: "Pagué veinte dólares ___ el libro."',
    options: ['por', 'para'], answer: 0,
    explanation: 'Exchange/price ("in exchange for") → por.',
  },
];

export function exercisesForTopic(topic: string): Exercise[] {
  return EXERCISES.filter((e) => e.topic === topic);
}
