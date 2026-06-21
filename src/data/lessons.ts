import type { Lesson } from '../types';

// Lessons are intentionally explanatory: every rule comes with the *reason*
// behind it. The `why` field in a section renders as a highlighted insight box.

export const LESSONS: Lesson[] = [
  // =========================================================================
  // PRESENT — REGULAR
  // =========================================================================
  {
    topic: 'present-regular',
    title: 'The Present Tense (regular verbs)',
    estMinutes: 8,
    intro:
      'Every Spanish verb ends in **-ar**, **-er**, or **-ir**. The ending tells you which "family" of endings to use. Once you see the pattern, you can conjugate thousands of verbs.',
    sections: [
      {
        heading: 'The idea: the ending carries the subject',
        body:
          'In English we *need* the pronoun: "I speak", "you speak". In Spanish the verb ending already tells you who is doing the action, so the pronoun is usually dropped. *Hablo* can only mean "I speak". That is why Spanish feels like it "drops" subjects — it isn\'t dropping information, the ending holds it.',
        why:
          'The endings are not random decoration — each one is a tiny label for the subject. Learn the endings and you can understand a sentence even with no pronoun.',
      },
      {
        heading: 'The three ending families',
        body: 'Drop the -ar / -er / -ir, then add the ending for the subject.',
        table: {
          caption: 'Regular present endings',
          columns: ['Subject', '-ar (hablar)', '-er (comer)', '-ir (vivir)'],
          rows: [
            ['yo', 'hablo', 'como', 'vivo'],
            ['tú', 'hablas', 'comes', 'vives'],
            ['él / ella / usted', 'habla', 'come', 'vive'],
            ['nosotros', 'hablamos', 'comemos', 'vivimos'],
            ['vosotros', 'habláis', 'coméis', 'vivís'],
            ['ellos / ellas / ustedes', 'hablan', 'comen', 'viven'],
          ],
        },
      },
      {
        heading: 'Notice the overlap',
        body:
          '-er and -ir verbs are almost identical — they only differ in *nosotros* and *vosotros*. So really you only have two patterns to learn, not three.',
        examples: [
          { es: 'Estudio español todos los días.', en: 'I study Spanish every day.' },
          { es: 'Comemos juntos los domingos.', en: 'We eat together on Sundays.' },
          { es: '¿Dónde vives?', en: 'Where do you live?', note: 'No "do" in Spanish — the present tense covers "live / do live / am living".' },
        ],
      },
    ],
    keyTakeaways: [
      'The verb ending tells you the subject, so pronouns are optional.',
      'Drop -ar/-er/-ir, then add the matching ending.',
      '-er and -ir verbs differ only in nosotros/vosotros.',
    ],
  },

  // =========================================================================
  // SER vs ESTAR
  // =========================================================================
  {
    topic: 'ser-estar',
    title: 'Ser vs. Estar',
    estMinutes: 9,
    intro:
      'Spanish has two verbs for "to be". The choice is never random — it reflects whether you are naming *what something is* (identity) or *how/where it is right now* (state).',
    sections: [
      {
        heading: 'The core contrast',
        body:
          '**Ser** = the essence or identity of something: who/what it is, where it\'s from, what it\'s made of, the time and date.\n\n**Estar** = the condition, location, or current state: where it is, how it feels, what\'s happening right now.',
        why:
          'Think "ser = identity, estar = status". A door is *de madera* (ser — it IS wood) but *abierta* (estar — its current status is open).',
      },
      {
        heading: 'A memory hook for each',
        body:
          'For **ser**, think **DOCTOR**: Description, Occupation, Characteristic, Time, Origin, Relationship.\n\nFor **estar**, think **PLACE**: Position, Location, Action (progressive), Condition, Emotion.',
        examples: [
          { es: 'Soy estudiante.', en: 'I am a student.', note: 'Occupation → ser.' },
          { es: 'Estoy cansada.', en: 'I am tired.', note: 'Temporary condition → estar.' },
          { es: 'La fiesta es en mi casa.', en: 'The party is (takes place) at my house.', note: 'Events use ser, even though it feels like location!' },
          { es: 'Madrid está en España.', en: 'Madrid is in Spain.', note: 'Location of a thing → estar.' },
        ],
      },
      {
        heading: 'Same word, different meaning',
        body:
          'Some adjectives change meaning with each verb — proof that the verb itself carries meaning.',
        examples: [
          { es: 'Ella es lista.', en: 'She is smart.', note: 'ser lista = clever (identity)' },
          { es: 'Ella está lista.', en: 'She is ready.', note: 'estar lista = ready (state)' },
          { es: 'La manzana es verde.', en: 'The apple is green (a green variety).' },
          { es: 'La manzana está verde.', en: 'The apple is unripe.' },
        ],
      },
    ],
    keyTakeaways: [
      'Ser = identity/essence (DOCTOR). Estar = state/location (PLACE).',
      'Events "take place" with ser; physical location uses estar.',
      'Some adjectives change meaning depending on the verb.',
    ],
  },

  // =========================================================================
  // PRESENT IRREGULAR
  // =========================================================================
  {
    topic: 'present-irregular',
    title: 'Stem-changing & irregular present verbs',
    estMinutes: 10,
    intro:
      'Many common verbs change their *stem* (the part before the ending) when it is stressed. The endings stay regular — only the vowel in the stem shifts.',
    sections: [
      {
        heading: 'Why the stem changes: stress',
        body:
          'When the spoken stress lands on the stem vowel, that vowel "breaks" into a diphthong. When stress moves to the ending (as in *nosotros*), the vowel relaxes back to normal. That is why *nosotros* and *vosotros* almost never change.',
        why:
          'The change follows the stress, not magic. That is also why the nosotros form is the "odd one out" — its stress is on the ending, so the stem stays calm. This shape is called the "boot" or "shoe" because of where the changes fall in the conjugation table.',
      },
      {
        heading: 'The three stem changes',
        body: 'e→ie, o→ue, and e→i. Endings are still regular.',
        table: {
          caption: 'querer (e→ie), poder (o→ue), pedir (e→i)',
          columns: ['Subject', 'querer', 'poder', 'pedir'],
          rows: [
            ['yo', 'quiero', 'puedo', 'pido'],
            ['tú', 'quieres', 'puedes', 'pides'],
            ['él/ella', 'quiere', 'puede', 'pide'],
            ['nosotros', 'queremos', 'podemos', 'pedimos'],
            ['vosotros', 'queréis', 'podéis', 'pedís'],
            ['ellos', 'quieren', 'pueden', 'piden'],
          ],
        },
      },
      {
        heading: 'Yo-irregular verbs',
        body:
          'A second group is regular *except* in the yo form, which ends in **-go** or is otherwise odd. These are extremely common.',
        examples: [
          { es: 'tener → tengo', en: 'to have → I have', note: 'also stem-changes: tienes, tiene…' },
          { es: 'hacer → hago', en: 'to do/make → I do' },
          { es: 'poner → pongo', en: 'to put → I put' },
          { es: 'salir → salgo', en: 'to leave → I leave' },
          { es: 'conocer → conozco', en: 'to know (people) → I know' },
        ],
      },
    ],
    keyTakeaways: [
      'Stem vowels change when stressed: e→ie, o→ue, e→i.',
      'Nosotros/vosotros keep the original vowel (the "boot" shape).',
      'Many verbs are irregular only in the yo form (-go verbs).',
    ],
  },

  // =========================================================================
  // PRETERITE
  // =========================================================================
  {
    topic: 'preterite',
    title: 'The Preterite (completed past)',
    estMinutes: 11,
    intro:
      'The preterite is the past tense for actions you view as **finished and bounded** — they started and ended. It is the "and then this happened" tense.',
    sections: [
      {
        heading: 'What the preterite means',
        body:
          'Use the preterite when an action is complete: it has a clear beginning, end, or both. "I ate", "she arrived", "we lived there for two years" — each is a single, closed event, even if it lasted a long time.',
        why:
          'The preterite is a **snapshot** — it freezes a completed event. The key is not how long it lasted, but whether you present it as *done*. "Viví allí diez años" is preterite because the living is over and bounded, start to finish.',
      },
      {
        heading: 'Regular endings',
        body: 'Note that -er and -ir verbs share the same endings here.',
        table: {
          caption: 'Regular preterite',
          columns: ['Subject', '-ar (hablar)', '-er/-ir (comer / vivir)'],
          rows: [
            ['yo', 'hablé', 'comí / viví'],
            ['tú', 'hablaste', 'comiste / viviste'],
            ['él/ella', 'habló', 'comió / vivió'],
            ['nosotros', 'hablamos', 'comimos / vivimos'],
            ['vosotros', 'hablasteis', 'comisteis / vivisteis'],
            ['ellos', 'hablaron', 'comieron / vivieron'],
          ],
        },
      },
      {
        heading: 'The high-frequency irregulars',
        body:
          'A handful of verbs use a new irregular stem plus a special set of endings (-e, -iste, -o, -imos, -isteis, -ieron) with **no accent marks**. Learn these — they appear constantly.',
        table: {
          caption: 'Irregular preterite stems',
          columns: ['Verb', 'Stem', 'Example (yo / él)'],
          rows: [
            ['tener', 'tuv-', 'tuve / tuvo'],
            ['estar', 'estuv-', 'estuve / estuvo'],
            ['poder', 'pud-', 'pude / pudo'],
            ['poner', 'pus-', 'puse / puso'],
            ['hacer', 'hic-', 'hice / hizo'],
            ['querer', 'quis-', 'quise / quiso'],
            ['venir', 'vin-', 'vine / vino'],
            ['decir', 'dij-', 'dije / dijo'],
          ],
        },
      },
      {
        heading: 'Ser and ir are identical here',
        body:
          'In the preterite, **ser** and **ir** share the exact same forms: fui, fuiste, fue, fuimos, fuisteis, fueron. Context tells them apart.',
        examples: [
          { es: 'Fui al cine.', en: 'I went to the movies.', note: 'ir' },
          { es: 'Fue un día perfecto.', en: 'It was a perfect day.', note: 'ser' },
        ],
      },
      {
        heading: 'Signal words',
        body:
          'These often point to the preterite: **ayer, anoche, el lunes pasado, hace dos años, de repente, entonces**.',
      },
    ],
    keyTakeaways: [
      'Preterite = a completed, bounded event (a snapshot).',
      'Length does not matter; "doneness" does.',
      'Memorize the irregular stems — they are everywhere.',
      'ser and ir share the same preterite forms.',
    ],
  },

  // =========================================================================
  // IMPERFECT
  // =========================================================================
  {
    topic: 'imperfect',
    title: 'The Imperfect (ongoing past)',
    estMinutes: 10,
    intro:
      'The imperfect describes the past **without boxing it in**. It is the "used to / was -ing / would (habitually)" tense — the background of a story rather than its events.',
    sections: [
      {
        heading: 'What the imperfect means',
        body:
          'Use the imperfect for ongoing, repeated, or habitual past actions, and for descriptions: weather, age, time, feelings, and setting the scene. It does not tell you when something started or ended — it just paints the situation.',
        why:
          'If the preterite is a snapshot, the imperfect is the **movie playing in the background**. "Llovía" (it was raining) gives no start or end — it is the ongoing backdrop against which snapshot events happen.',
      },
      {
        heading: 'Endings — and only three irregulars',
        body:
          'The imperfect is the most regular tense in Spanish. -er and -ir again share endings. There are exactly **three** irregular verbs: ser, ir, ver.',
        table: {
          caption: 'Regular imperfect',
          columns: ['Subject', '-ar (hablar)', '-er/-ir (comer/vivir)'],
          rows: [
            ['yo', 'hablaba', 'comía / vivía'],
            ['tú', 'hablabas', 'comías / vivías'],
            ['él/ella', 'hablaba', 'comía / vivía'],
            ['nosotros', 'hablábamos', 'comíamos / vivíamos'],
            ['vosotros', 'hablabais', 'comíais / vivíais'],
            ['ellos', 'hablaban', 'comían / vivían'],
          ],
        },
      },
      {
        heading: 'The only three irregulars',
        body: 'Memorize these and you know every imperfect verb in Spanish.',
        table: {
          caption: 'ser / ir / ver',
          columns: ['Subject', 'ser', 'ir', 'ver'],
          rows: [
            ['yo', 'era', 'iba', 'veía'],
            ['tú', 'eras', 'ibas', 'veías'],
            ['él/ella', 'era', 'iba', 'veía'],
            ['nosotros', 'éramos', 'íbamos', 'veíamos'],
            ['ellos', 'eran', 'iban', 'veían'],
          ],
        },
      },
      {
        heading: 'Signal words',
        body:
          'These often point to the imperfect: **siempre, todos los días, generalmente, mientras, de niño/a, cada año, a menudo**.',
        examples: [
          { es: 'De niña, jugaba en el parque.', en: 'As a girl, I used to play in the park.' },
          { es: 'Eran las tres de la tarde.', en: 'It was three in the afternoon.', note: 'Time in the past is always imperfect.' },
        ],
      },
    ],
    keyTakeaways: [
      'Imperfect = ongoing, habitual, or descriptive past (the backdrop).',
      'It does not mark a beginning or end.',
      'Only three irregulars: ser (era), ir (iba), ver (veía).',
      'Time, age, and weather in the past are imperfect.',
    ],
  },

  // =========================================================================
  // PRETERITE vs IMPERFECT  (priority lesson)
  // =========================================================================
  {
    topic: 'preterite-vs-imperfect',
    title: 'Preterite vs. Imperfect — choosing the right past',
    estMinutes: 14,
    intro:
      'Both are past tenses, so the choice is not about *time* — it is about **how you view the action**. This is the single most important decision in Spanish past narration, and once the underlying idea clicks, the rules become obvious.',
    sections: [
      {
        heading: 'The one question that decides it',
        body:
          'Ask: *Am I reporting a completed event, or describing a situation in progress?*\n\n- Completed event with edges → **preterite** (snapshot).\n- Ongoing situation, habit, or description → **imperfect** (movie).',
        why:
          'The same real-life event can take either tense depending on your *viewpoint*. "Comí a las ocho" = I ate at 8 (a completed event). "Comía cuando llamaste" = I was eating when you called (an action in progress that got interrupted). Spanish forces you to choose a camera angle.',
      },
      {
        heading: 'How they work together in a story',
        body:
          'In real narration they team up: the **imperfect sets the scene** (background, weather, feelings, what was already going on) and the **preterite delivers the events** (what then happened). The interruption pattern is the classic case.',
        examples: [
          {
            es: 'Era de noche y llovía. De repente, alguien tocó la puerta.',
            en: 'It was night and it was raining. Suddenly, someone knocked on the door.',
            note: 'Background (imperfect) → event that breaks in (preterite).',
          },
          {
            es: 'Mientras estudiaba, sonó el teléfono.',
            en: 'While I was studying, the phone rang.',
            note: 'Ongoing action (imperfect) interrupted by an event (preterite).',
          },
        ],
      },
      {
        heading: 'A side-by-side cheat sheet',
        body: 'Same situations, different lenses.',
        table: {
          caption: 'When to use each',
          columns: ['Use PRETERITE for…', 'Use IMPERFECT for…'],
          rows: [
            ['A completed action (it ended)', 'An action in progress ("was -ing")'],
            ['A sequence of events', 'Habits / repeated actions ("used to")'],
            ['A sudden change or reaction', 'Descriptions: weather, scenery, mood'],
            ['An action with a stated duration/number', 'Time, date, and age in the past'],
            ['The "what happened" of a story', 'The "what was going on" backdrop'],
          ],
        },
      },
      {
        heading: 'Verbs that flip meaning',
        body:
          'A few verbs translate differently depending on the lens, which proves the tense carries meaning, not just timing.',
        examples: [
          { es: 'Sabía la respuesta.', en: 'I knew the answer.', note: 'imperfect = ongoing state of knowing' },
          { es: 'Supe la verdad.', en: 'I found out the truth.', note: 'preterite = the moment knowledge began' },
          { es: 'Conocía a María.', en: 'I knew María (already).', note: 'imperfect = ongoing acquaintance' },
          { es: 'Conocí a María.', en: 'I met María.', note: 'preterite = the moment we met' },
          { es: 'No quería ir.', en: 'I didn\'t want to go.', note: 'imperfect = ongoing reluctance' },
          { es: 'No quise ir.', en: 'I refused to go.', note: 'preterite = a decisive act' },
        ],
      },
      {
        heading: 'A practical trick',
        body:
          'When you can naturally say "**used to**" or "**was/were ___-ing**" in English, choose the imperfect. When you can say "**did**" / a one-time "**-ed**", choose the preterite. It is not perfect, but it catches most cases while your instinct develops.',
      },
    ],
    keyTakeaways: [
      'It is about viewpoint, not time: completed vs. in-progress.',
      'Imperfect paints the background; preterite delivers the events.',
      'Interruptions: imperfect (going on) + preterite (broke in).',
      'Some verbs (saber, conocer, querer) change meaning between the two.',
    ],
  },

  // =========================================================================
  // PRESENT PERFECT
  // =========================================================================
  {
    topic: 'present-perfect',
    title: 'The Present Perfect (he hablado)',
    estMinutes: 8,
    intro:
      'The present perfect says something **"has happened"** — a past action that still feels connected to the present. It is built from the helper verb **haber** plus a past participle.',
    sections: [
      {
        heading: 'How it is built',
        body:
          'Present of **haber** (he, has, ha, hemos, habéis, han) + **past participle** (-ar → -ado, -er/-ir → -ido). The two parts never separate, and the participle never changes to agree with the subject here.',
        table: {
          caption: 'hablar in the present perfect',
          columns: ['Subject', 'haber', '+ participle'],
          rows: [
            ['yo', 'he', 'hablado'],
            ['tú', 'has', 'hablado'],
            ['él/ella', 'ha', 'hablado'],
            ['nosotros', 'hemos', 'hablado'],
            ['ellos', 'han', 'hablado'],
          ],
        },
      },
      {
        heading: 'When to use it',
        body:
          'For recent past actions, life experiences, and things within a still-open time frame (today, this week, this year). It mirrors English "have/has done".',
        why:
          'Use it when the past action lives inside a time frame that has not closed yet — "hoy", "esta semana", "en mi vida". If the time frame is closed (ayer, el año pasado), switch to the preterite.',
        examples: [
          { es: 'He estudiado mucho hoy.', en: 'I have studied a lot today.', note: '"today" is still open → present perfect' },
          { es: 'Estudié mucho ayer.', en: 'I studied a lot yesterday.', note: '"yesterday" is closed → preterite' },
          { es: '¿Alguna vez has probado el ceviche?', en: 'Have you ever tried ceviche?' },
        ],
      },
      {
        heading: 'Irregular participles',
        body: 'A short list to memorize.',
        examples: [
          { es: 'hacer → hecho', en: 'done/made' },
          { es: 'ver → visto', en: 'seen' },
          { es: 'escribir → escrito', en: 'written' },
          { es: 'decir → dicho', en: 'said' },
          { es: 'volver → vuelto', en: 'returned' },
          { es: 'abrir → abierto', en: 'opened' },
        ],
      },
    ],
    keyTakeaways: [
      'haber (present) + past participle = "has/have done".',
      'Use it for an open time frame still connected to now.',
      'Closed time frame → use the preterite instead.',
      'Memorize the irregular participles (hecho, visto, escrito…).',
    ],
  },

  // =========================================================================
  // FUTURE
  // =========================================================================
  {
    topic: 'future',
    title: 'The Future Tense (hablaré)',
    estMinutes: 10,
    intro:
      'Spanish has two everyday ways to talk about the future. Knowing *why* each exists makes the choice natural instead of a guess.',
    sections: [
      {
        heading: 'Two futures, two flavors',
        body:
          '**ir a + infinitive** ("voy a estudiar") = the near, planned, "going to" future. It feels intentional and close.\n\n**Simple future** ("estudiaré") = a more formal or less certain future, predictions, and promises. It can also express *probability* about the present.',
        why:
          'The simple future is not just "more formal" — it carries a flavor of prediction or supposition. "Serán las tres" doesn\'t mean "they will be three"; it means "it\'s probably three o\'clock". The future tense can guess about *now*.',
      },
      {
        heading: 'The easiest conjugation in Spanish',
        body:
          'For the simple future you add the endings to the **whole infinitive** — no need to drop -ar/-er/-ir. All three families use identical endings, and every ending except *nosotros* has an accent.',
        table: {
          caption: 'Simple future endings (added to the full infinitive)',
          columns: ['Subject', 'hablar', 'comer', 'vivir'],
          rows: [
            ['yo', 'hablaré', 'comeré', 'viviré'],
            ['tú', 'hablarás', 'comerás', 'vivirás'],
            ['él/ella', 'hablará', 'comerá', 'vivirá'],
            ['nosotros', 'hablaremos', 'comeremos', 'viviremos'],
            ['ellos', 'hablarán', 'comerán', 'vivirán'],
          ],
        },
      },
      {
        heading: 'Irregular stems (same endings)',
        body:
          'A dozen common verbs use a shortened or modified stem, but the **endings never change**. Learn the stem once and it also works for the conditional.',
        table: {
          caption: 'Irregular future stems',
          columns: ['Verb', 'Stem', 'Example'],
          rows: [
            ['tener', 'tendr-', 'tendré'],
            ['salir', 'saldr-', 'saldré'],
            ['poder', 'podr-', 'podré'],
            ['poner', 'pondr-', 'pondré'],
            ['hacer', 'har-', 'haré'],
            ['decir', 'dir-', 'diré'],
            ['querer', 'querr-', 'querré'],
            ['saber', 'sabr-', 'sabré'],
          ],
        },
      },
      {
        heading: 'In use',
        body: '',
        examples: [
          { es: 'Voy a llamarte esta noche.', en: 'I am going to call you tonight.', note: 'near, planned' },
          { es: 'Algún día viajaré por toda Latinoamérica.', en: 'Someday I will travel all over Latin America.', note: 'prediction/promise' },
          { es: '¿Dónde estará Liana? Estará en clase.', en: 'Where could Liana be? She is probably in class.', note: 'future of probability about NOW' },
        ],
      },
    ],
    keyTakeaways: [
      'ir a + infinitive = near, planned future ("going to").',
      'Simple future = predictions, promises, formality, probability.',
      'Endings attach to the whole infinitive; only nosotros has no accent.',
      'Irregular future stems are shared with the conditional.',
    ],
  },

  // =========================================================================
  // CONDITIONAL
  // =========================================================================
  {
    topic: 'conditional',
    title: 'The Conditional (hablaría)',
    estMinutes: 9,
    intro:
      'The conditional is the **"would"** tense: hypotheticals, polite requests, and what *was going to* happen from a past point of view. It is the twin of the future tense.',
    sections: [
      {
        heading: 'Same stems as the future',
        body:
          'Good news: the conditional uses the **exact same stems** as the future (including all the irregulars), just with imperfect-style endings: -ía, -ías, -ía, -íamos, -íais, -ían. If you know the future, the conditional is nearly free.',
        table: {
          caption: 'Conditional endings (added to the future stem)',
          columns: ['Subject', 'hablar', 'tener (tendr-)'],
          rows: [
            ['yo', 'hablaría', 'tendría'],
            ['tú', 'hablarías', 'tendrías'],
            ['él/ella', 'hablaría', 'tendría'],
            ['nosotros', 'hablaríamos', 'tendríamos'],
            ['ellos', 'hablarían', 'tendrían'],
          ],
        },
      },
      {
        heading: 'Its three main jobs',
        body:
          '1. **Hypotheticals** — what *would* happen: "Yo viajaría más si tuviera dinero."\n2. **Politeness** — softening requests: "¿Podrías ayudarme?" is gentler than "¿Puedes?"\n3. **Future-of-the-past** — what was going to happen, seen from the past: "Dijo que llegaría tarde" (He said he would arrive late).',
        why:
          'Notice the symmetry: the **future** predicts from *now* ("llegará"), and the **conditional** predicts from a point in the *past* ("dijo que llegaría"). Same idea, shifted backward in time. That is why they share stems.',
        examples: [
          { es: 'Me gustaría un café, por favor.', en: 'I would like a coffee, please.', note: 'politeness' },
          { es: 'En tu lugar, yo estudiaría más.', en: 'In your place, I would study more.', note: 'hypothetical advice' },
        ],
      },
    ],
    keyTakeaways: [
      'Conditional = "would": hypotheticals, politeness, future-of-the-past.',
      'It reuses the future stems + imperfect endings (-ía…).',
      'Future predicts from now; conditional predicts from the past.',
    ],
  },

  // =========================================================================
  // SUBJUNCTIVE vs INDICATIVE  (priority lesson)
  // =========================================================================
  {
    topic: 'subjunctive-vs-indicative',
    title: 'Indicative vs. Subjunctive — what "mood" actually means',
    estMinutes: 14,
    intro:
      'People say "the subjunctive is a tense", but it is not — it is a **mood**. A tense tells you *when*; a mood tells you *how the speaker relates to what they are saying*: as a fact, or as something wished-for, doubted, or unreal. Get this idea and the rules stop feeling arbitrary.',
    sections: [
      {
        heading: 'Indicative = reality. Subjunctive = everything else.',
        body:
          'The **indicative** states things the speaker presents as real and factual: "Liana **habla** español." It indicates reality.\n\nThe **subjunctive** is for things filtered through a wish, an emotion, a doubt, or a possibility — things that are *not asserted as plain fact*: "Quiero que Liana **hable** español." Here, her speaking Spanish is a *desire*, not (yet) a reality.',
        why:
          'Same verb, two moods: *habla* (indicative — she does speak) vs. *hable* (subjunctive — wanted/hoped, not asserted as fact). The mood is the speaker\'s stamp: "this is real" vs. "this is desired/doubtful/unreal".',
      },
      {
        heading: 'Where the confusion comes from',
        body:
          'Many learners (especially heritage speakers who learned by ear) *produce* the subjunctive correctly out of habit — "Ojalá que **venga**" just sounds right — but were never shown the underlying logic, so they cannot extend it to new sentences. The word you are thinking of is **subjunctive** vs. **indicative** (not "conjunctive"). "Conjunctive" usually refers to conjunctions — little linking words like *que*, *cuando*, *aunque* — which, helpfully, are exactly the words that often *introduce* the subjunctive.',
      },
      {
        heading: 'The two-clause structure',
        body:
          'The subjunctive almost always lives in a **subordinate clause** introduced by **que**, after a main clause that expresses a wish, emotion, doubt, etc.\n\n`[main clause: trigger]  +  que  +  [subjunctive verb]`\n\nThe two clauses usually have **different subjects**. If the subject does not change, Spanish often just uses an infinitive instead.',
        examples: [
          { es: 'Espero que (tú) descanses.', en: 'I hope (that) you rest.', note: 'Two subjects (yo / tú) + trigger of hope → subjunctive.' },
          { es: 'Quiero descansar.', en: 'I want to rest.', note: 'Same subject (yo / yo) → just an infinitive, no subjunctive.' },
          { es: 'Sé que ella viene.', en: 'I know that she is coming.', note: 'Knowing = a fact → indicative (viene).' },
          { es: 'Dudo que ella venga.', en: 'I doubt that she is coming.', note: 'Doubt → subjunctive (venga).' },
        ],
      },
      {
        heading: 'A telling minimal pair',
        body:
          'Watch how the meaning shifts with the mood after the same conjunction.',
        examples: [
          { es: 'Cuando llegó, comimos.', en: 'When he arrived, we ate.', note: 'Indicative: a real, completed event.' },
          { es: 'Cuando llegue, comeremos.', en: 'When he arrives, we will eat.', note: 'Subjunctive: the arrival is still unrealized/future.' },
          { es: 'Aunque es caro, lo compro.', en: 'Even though it IS expensive, I am buying it.', note: 'Indicative: stated as fact.' },
          { es: 'Aunque sea caro, lo compro.', en: 'Even if it BE expensive, I am buying it.', note: 'Subjunctive: hypothetical, not asserted.' },
        ],
      },
    ],
    keyTakeaways: [
      'Subjunctive is a mood (the speaker\'s stance), not a tense.',
      'Indicative = asserted as real; subjunctive = wished/doubted/unreal.',
      'It lives in a "que" clause after a trigger, usually with a new subject.',
      'Same subject? Use an infinitive, not the subjunctive.',
    ],
  },

  // =========================================================================
  // SUBJUNCTIVE — FORM
  // =========================================================================
  {
    topic: 'subjunctive-present',
    title: 'Forming the Present Subjunctive',
    estMinutes: 11,
    intro:
      'Forming the present subjunctive is mechanical once you know the trick: start from the **yo form**, then use the **"opposite" vowel**. This one method handles almost every verb, including irregulars.',
    sections: [
      {
        heading: 'The three-step recipe',
        body:
          '1. Take the **yo** form of the present indicative (e.g., hablo, tengo, conozco).\n2. Drop the **-o**.\n3. Add the **opposite-vowel** endings: -ar verbs take **e**-endings; -er/-ir verbs take **a**-endings.',
        why:
          'Starting from the yo form is what makes irregular stems "come along for free". Because *tengo* → *teng-*, the whole subjunctive is *tenga, tengas, tenga…* — no separate list to memorize. The yo form already baked in the irregularity.',
        table: {
          caption: 'Present subjunctive endings',
          columns: ['Subject', '-ar (hablar → habl-)', '-er/-ir (comer → com-)'],
          rows: [
            ['yo', 'hable', 'coma'],
            ['tú', 'hables', 'comas'],
            ['él/ella', 'hable', 'coma'],
            ['nosotros', 'hablemos', 'comamos'],
            ['vosotros', 'habléis', 'comáis'],
            ['ellos', 'hablen', 'coman'],
          ],
        },
      },
      {
        heading: 'Why "opposite vowel"?',
        body:
          'In the indicative, -ar verbs are full of **a** (hablas, habla, hablan) and -er/-ir verbs are full of **e/i**. The subjunctive deliberately swaps them, so the verb "sounds wrong" on purpose — a built-in signal that you have left plain reality.',
      },
      {
        heading: 'The few truly irregular verbs',
        body:
          'Six verbs do not come from a yo form ending in -o. The mnemonic **DISHES** helps: Dar, Ir, Ser, Haber, Estar, Saber.',
        table: {
          caption: 'Irregular present subjunctive (yo / él form)',
          columns: ['Verb', 'Subjunctive', 'Verb', 'Subjunctive'],
          rows: [
            ['dar', 'dé', 'haber', 'haya'],
            ['ir', 'vaya', 'estar', 'esté'],
            ['ser', 'sea', 'saber', 'sepa'],
          ],
        },
      },
      {
        heading: 'Quick examples',
        body: '',
        examples: [
          { es: 'Es importante que estudies.', en: 'It is important that you study.', note: 'estudiar → estudi- + e-endings' },
          { es: 'Ojalá que tengas razón.', en: 'I hope you are right.', note: 'tengo → teng- → tengas' },
          { es: 'No creo que sea verdad.', en: 'I don\'t think it is true.', note: 'ser is irregular → sea' },
        ],
      },
    ],
    keyTakeaways: [
      'Recipe: yo form → drop -o → add the opposite vowel endings.',
      '-ar verbs take e-endings; -er/-ir verbs take a-endings.',
      'Irregular yo forms carry over automatically (tengo → tenga).',
      'Only six real irregulars: DISHES (dar, ir, ser, haber, estar, saber).',
    ],
  },

  // =========================================================================
  // SUBJUNCTIVE — USES
  // =========================================================================
  {
    topic: 'subjunctive-uses',
    title: 'When to use the Subjunctive (WEIRDO triggers)',
    estMinutes: 12,
    intro:
      'Knowing how to *form* the subjunctive is only half the job. The other half is recognizing the **triggers** in the main clause that demand it. The classic mnemonic is **WEIRDO**.',
    sections: [
      {
        heading: 'WEIRDO',
        body:
          '**W** — Wishes / wanting: querer que, esperar que, preferir que, ojalá.\n**E** — Emotion: alegrarse de que, temer que, es triste que, me molesta que.\n**I** — Impersonal expressions: es importante que, es necesario que, es posible que.\n**R** — Recommendations / requests: recomendar que, sugerir que, pedir que, insistir en que.\n**D** — Doubt / denial: dudar que, no creer que, no es verdad que, negar que.\n**O** — Ojalá and "the unknown": ojalá que…, plus indefinite/nonexistent antecedents.',
        why:
          'Every WEIRDO category is really the same idea from the indicative-vs-subjunctive lesson: the action in the *que*-clause is **not being asserted as a plain fact**. Wishing it, fearing it, doubting it, or requesting it all leave reality unconfirmed — so the verb shifts to subjunctive.',
      },
      {
        heading: 'The trigger test',
        body:
          'Before conjugating, run this check:\n1. Is there a **main clause + que + second clause**?\n2. Does the main clause express a WEIRDO meaning (will, emotion, doubt, etc.)?\n3. Are the **subjects different**?\n\nThree yeses → subjunctive in the second clause.',
        examples: [
          { es: 'Te recomiendo que pruebes el gallo pinto.', en: 'I recommend that you try gallo pinto.', note: 'R: recommendation + new subject' },
          { es: 'Es posible que llueva mañana.', en: 'It is possible that it will rain tomorrow.', note: 'I: impersonal possibility' },
          { es: 'Me alegro de que estés aquí.', en: 'I am glad that you are here.', note: 'E: emotion' },
        ],
      },
      {
        heading: 'Watch the flips: certainty vs. doubt',
        body:
          'Some triggers flip the mood when negated, because negating them changes whether reality is asserted.',
        examples: [
          { es: 'Creo que viene.', en: 'I think he is coming.', note: 'Belief asserted → indicative (viene).' },
          { es: 'No creo que venga.', en: 'I don\'t think he is coming.', note: 'Doubt now → subjunctive (venga).' },
          { es: 'Es verdad que tiene razón.', en: 'It is true that he is right.', note: 'Fact → indicative.' },
          { es: 'No es verdad que tenga razón.', en: 'It is not true that he is right.', note: 'Denial → subjunctive.' },
        ],
      },
      {
        heading: 'Time conjunctions: only when still unreal',
        body:
          'After **cuando, en cuanto, hasta que, antes de que, tan pronto como**, use the subjunctive when the event has **not happened yet** (it is still hypothetical/future), and the indicative when it is a habit or a completed fact.',
        examples: [
          { es: 'Cuando termine la tarea, te llamo.', en: 'When I finish the homework, I\'ll call you.', note: 'Not done yet → subjunctive.' },
          { es: 'Cuando termino la tarea, te llamo.', en: 'When(ever) I finish the homework, I call you.', note: 'Habit → indicative.' },
        ],
      },
    ],
    keyTakeaways: [
      'WEIRDO = Wishes, Emotion, Impersonal, Recommendations, Doubt, Ojalá.',
      'Test: que-clause + WEIRDO trigger + different subjects → subjunctive.',
      'Negating a certainty verb (creer, es verdad) flips it to subjunctive.',
      'Time words (cuando…) use subjunctive only for not-yet-real events.',
    ],
  },

  // =========================================================================
  // COMMANDS
  // =========================================================================
  {
    topic: 'commands',
    title: 'Commands (imperatives)',
    estMinutes: 10,
    intro:
      'Commands tell people what to do. The surprising part: **most command forms are simply borrowed from the subjunctive** — so learning commands reinforces the subjunctive, and vice versa.',
    sections: [
      {
        heading: 'The big picture',
        body:
          'Every command form **except the affirmative tú and vosotros** comes straight from the present subjunctive. That is why mastering the subjunctive forms pays off twice.',
        why:
          'A command is really a wish aimed at someone — "(I want that) you do this". That hidden wish is why Spanish reaches for the subjunctive form. "¡Que tengas un buen día!" literally borrows the subjunctive to express a wish-command.',
      },
      {
        heading: 'Affirmative tú — the exception',
        body:
          'The affirmative **tú** command usually looks like the *él/ella* present indicative form: habla, come, escribe. But there are eight common irregulars worth memorizing.',
        table: {
          caption: 'Irregular affirmative tú commands',
          columns: ['Verb', 'Command', 'Verb', 'Command'],
          rows: [
            ['tener', 'ten', 'salir', 'sal'],
            ['venir', 'ven', 'hacer', 'haz'],
            ['poner', 'pon', 'decir', 'di'],
            ['ir', 've', 'ser', 'sé'],
          ],
        },
      },
      {
        heading: 'Everything else uses the subjunctive',
        body:
          'Negative tú, all usted/ustedes, and nosotros ("let\'s…") commands use subjunctive forms.',
        table: {
          caption: 'Command forms for hablar / comer',
          columns: ['Form', 'hablar', 'comer'],
          rows: [
            ['tú (+)', 'habla', 'come'],
            ['tú (–)', 'no hables', 'no comas'],
            ['usted', 'hable', 'coma'],
            ['ustedes', 'hablen', 'coman'],
            ['nosotros', 'hablemos', 'comamos'],
          ],
        },
      },
      {
        heading: 'Pronoun placement',
        body:
          'Attach object/reflexive pronouns to the **end** of affirmative commands (and add an accent to keep the stress): "Dímelo." For negative commands, the pronouns go **before** the verb: "No me lo digas."',
        examples: [
          { es: '¡Levántate!', en: 'Get up!', note: 'pronoun attached, accent added' },
          { es: 'No te preocupes.', en: 'Don\'t worry.', note: 'negative → pronoun before verb' },
        ],
      },
    ],
    keyTakeaways: [
      'All commands except affirmative tú/vosotros use subjunctive forms.',
      'Affirmative tú = él/ella present form, with 8 irregulars (ten, ven, pon…).',
      'Affirmative: attach pronouns + accent. Negative: pronouns go before.',
    ],
  },

  // =========================================================================
  // POR vs PARA
  // =========================================================================
  {
    topic: 'por-vs-para',
    title: 'Por vs. Para',
    estMinutes: 9,
    intro:
      'Both translate as "for", but they point in opposite directions: **para** looks ahead to a goal or destination, while **por** looks at the cause, the means, or the trade behind something.',
    sections: [
      {
        heading: 'The directional idea',
        body:
          '**Para → the destination/purpose** (the arrow points forward to a goal): recipient, deadline, "in order to", destination.\n\n**Por → the motivation/passage** (the cause behind, the route through, the exchange): reason, "by/through", duration, price.',
        why:
          'A quick gut check: if you can substitute "in order to" or "destined for", use **para**. If you mean "because of", "in exchange for", or "through", use **por**. Para = forward to a goal; por = the why/how behind it.',
      },
      {
        heading: 'Para — goals and destinations',
        body: '',
        examples: [
          { es: 'Este regalo es para ti.', en: 'This gift is for you.', note: 'recipient' },
          { es: 'Estudio para aprender.', en: 'I study (in order) to learn.', note: 'purpose' },
          { es: 'La tarea es para el lunes.', en: 'The homework is for (due) Monday.', note: 'deadline' },
          { es: 'Salgo para Costa Rica.', en: 'I leave for Costa Rica.', note: 'destination' },
        ],
      },
      {
        heading: 'Por — cause, exchange, passage',
        body: '',
        examples: [
          { es: 'Gracias por tu ayuda.', en: 'Thanks for your help.', note: 'reason/motivation' },
          { es: 'Pagué veinte dólares por el libro.', en: 'I paid twenty dollars for the book.', note: 'exchange' },
          { es: 'Caminamos por el parque.', en: 'We walked through the park.', note: 'passage/route' },
          { es: 'Estudié por dos horas.', en: 'I studied for two hours.', note: 'duration' },
        ],
      },
    ],
    keyTakeaways: [
      'Para = goal, destination, recipient, deadline ("in order to").',
      'Por = cause, exchange, route, duration ("because of / through").',
      'Gut check: "in order to" → para; "because of / in exchange" → por.',
    ],
  },

  // =========================================================================
  // PAST SUBJUNCTIVE & "SI" CLAUSES
  // =========================================================================
  {
    topic: 'past-subjunctive',
    title: 'The Past Subjunctive & "if" clauses',
    estMinutes: 12,
    intro:
      'The past (imperfect) subjunctive is what powers sentences like "**Si tuviera** tiempo, **viajaría** por el mundo" — *If I had time, I would travel the world*. It is the mood of the hypothetical and the contrary-to-fact.',
    sections: [
      {
        heading: 'How to form it (one reliable trick)',
        body:
          '1. Take the **ellos** form of the **preterite** (hablaron, comieron, tuvieron, fueron).\n2. Drop **-ron**.\n3. Add **-ra, -ras, -ra, -´ramos, -rais, -ran**.\n\nBecause it starts from the preterite, every irregular preterite stem comes along automatically.',
        why:
          'Starting from the preterite ellos form is the whole secret: tuvieron → tuvie- → **tuviera**; fueron → fue- → **fuera**. No separate irregular list — if you know the preterite, you know the past subjunctive.',
        table: {
          caption: 'Past subjunctive (-ra endings)',
          columns: ['Subject', 'hablar (hablaron)', 'tener (tuvieron)', 'ser/ir (fueron)'],
          rows: [
            ['yo', 'hablara', 'tuviera', 'fuera'],
            ['tú', 'hablaras', 'tuvieras', 'fueras'],
            ['él/ella', 'hablara', 'tuviera', 'fuera'],
            ['nosotros', 'habláramos', 'tuviéramos', 'fuéramos'],
            ['ellos', 'hablaran', 'tuvieran', 'fueran'],
          ],
        },
      },
      {
        heading: 'Its #1 job: contrary-to-fact "si" clauses',
        body:
          'For an "if" that is hypothetical or **untrue right now**, use:\n\n`Si + past subjunctive , conditional`\n\nThe "si" clause takes the past subjunctive; the result clause takes the conditional ("would").',
        examples: [
          { es: 'Si tuviera dinero, viajaría más.', en: 'If I had money, I would travel more.', note: 'I don\'t have it → hypothetical.' },
          { es: 'Si fuera tú, estudiaría más.', en: 'If I were you, I would study more.', note: 'Classic advice pattern.' },
          { es: 'Si pudiéramos, lo haríamos.', en: 'If we could, we would do it.' },
        ],
      },
      {
        heading: 'Real vs. unreal "if"',
        body:
          'Only **unreal/hypothetical** "if" uses the past subjunctive. A **real, possible** condition stays in the indicative.',
        examples: [
          { es: 'Si tengo tiempo, te llamo.', en: 'If I have time, I\'ll call you.', note: 'Real possibility → indicative.' },
          { es: 'Si tuviera tiempo, te llamaría.', en: 'If I had time, I would call you.', note: 'Unreal/unlikely → past subjunctive + conditional.' },
        ],
      },
      {
        heading: 'Also: past triggers and polite "quisiera"',
        body:
          'When a WEIRDO trigger is in the **past**, the subjunctive that follows also shifts to the past: "Quería que **vinieras**" (I wanted you to come). And **quisiera** is a very common, extra-polite "I would like": *Quisiera un café*.',
        examples: [
          { es: 'Esperaba que llegaras a tiempo.', en: 'I was hoping you would arrive on time.' },
          { es: 'Quisiera hacer una pregunta.', en: 'I would like to ask a question.', note: 'Softer/more polite than "quiero".' },
        ],
      },
    ],
    keyTakeaways: [
      'Form it from the preterite ellos form: drop -ron, add -ra endings.',
      'Contrary-to-fact: Si + past subjunctive, + conditional.',
      'Real, possible "if" stays indicative (Si tengo…, te llamo).',
      'Past WEIRDO triggers push the subjunctive into the past; "quisiera" = polite "I\'d like".',
    ],
  },

  // =========================================================================
  // CONVERSATION: EVERYDAY QUESTIONS
  // =========================================================================
  {
    topic: 'conversation-everyday',
    title: 'Conversation: everyday questions',
    estMinutes: 8,
    intro:
      'Real fluency is answering **in the moment**, without translating in your head first. This lesson gives you a toolkit for the everyday questions you\'ll be asked again and again — then you practice answering them out loud.',
    sections: [
      {
        heading: 'The strategy: buy time, then build',
        body:
          'You don\'t need the perfect sentence instantly. Start with a short filler to buy a second, then answer in simple, complete sentences. It is better to say two clear sentences than to freeze hunting for one perfect one.',
        why:
          'Native speakers use fillers constantly. Learning a few ("bueno…", "pues…", "a ver…", "la verdad es que…") makes you sound natural AND gives your brain a moment to plan — the single biggest unlock for in-the-moment speaking.',
      },
      {
        heading: 'Fillers & starters to keep handy',
        body:
          '**Buying time:** Bueno… · Pues… · A ver… · Déjame pensar… (let me think)\n\n**Starting an answer:** La verdad es que… (the truth is) · Para mí… · Normalmente… · Me gusta(n)… · Creo que…',
      },
      {
        heading: 'Common questions — and a way in',
        body: '',
        examples: [
          { es: '¿Qué te gusta hacer en tu tiempo libre?', en: 'What do you like to do in your free time?', note: 'Start: "Me gusta… / En mi tiempo libre, normalmente…"' },
          { es: '¿Cómo fue tu fin de semana?', en: 'How was your weekend?', note: 'Use past tenses: "Fue muy bueno. El sábado…"' },
          { es: '¿Qué vas a hacer este verano?', en: 'What are you going to do this summer?', note: 'Use the future: "Voy a… / Espero…"' },
          { es: '¿Cómo es tu familia?', en: 'What is your family like?', note: 'Describe: "Somos cuatro. Mi… es…"' },
        ],
      },
    ],
    keyTakeaways: [
      'Aim for clear and complete, not perfect — two simple sentences beat one frozen one.',
      'Use fillers (bueno, pues, a ver) to buy planning time and sound natural.',
      'Match the tense to the question: past for "how was…", future for "what will…".',
    ],
  },

  // =========================================================================
  // CONVERSATION: TELLING A STORY
  // =========================================================================
  {
    topic: 'conversation-narrate',
    title: 'Conversation: telling a story',
    estMinutes: 9,
    intro:
      'Narrating a past event is where your tenses come alive. This is hands-on **review of preterite vs. imperfect** — used together, in connected speech, the way you actually tell a story.',
    sections: [
      {
        heading: 'The backbone: set the scene, then the events',
        body:
          'Open with the **imperfect** to paint the background (when, where, weather, mood), then use the **preterite** for the chain of things that happened. Close with how it ended or how you felt.',
        why:
          'This is the preterite-vs-imperfect rule in its natural habitat: imperfect = the stage and scenery, preterite = the actors\' actions. Telling stories is the fastest way to make that choice automatic.',
      },
      {
        heading: 'Connectors that make it flow',
        body:
          '**Sequence:** Primero… · Luego / Después… · Entonces… · Más tarde… · Al final…\n\n**Drama:** De repente… (suddenly) · De pronto… · Por suerte… (luckily) · Lo peor fue que… (the worst part was…)',
      },
      {
        heading: 'A mini-model',
        body: '',
        examples: [
          {
            es: 'Era sábado y hacía sol. Caminaba por el parque cuando, de repente, empezó a llover. Corrí a un café, pedí un chocolate caliente y al final fue una tarde perfecta.',
            en: 'It was Saturday and sunny. I was walking through the park when, suddenly, it started to rain. I ran to a café, ordered a hot chocolate, and in the end it was a perfect afternoon.',
            note: 'Imperfect (era, hacía, caminaba) sets the scene; preterite (empezó, corrí, pedí, fue) carries the events.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Scene-setting (when/where/weather/feelings) = imperfect.',
      'The sequence of events = preterite.',
      'Connectors (primero, luego, de repente, al final) hold the story together.',
    ],
  },

  // =========================================================================
  // CONVERSATION: OPINIONS & CONNECTORS
  // =========================================================================
  {
    topic: 'conversation-opinions',
    title: 'Conversation: opinions & connectors',
    estMinutes: 9,
    intro:
      'Advanced conversation means having a real exchange — giving an opinion, agreeing or pushing back, and connecting your ideas so they flow. Here are the building blocks.',
    sections: [
      {
        heading: 'Stating an opinion',
        body:
          '**Creo que… / Pienso que… / Me parece que…** + indicative (you\'re asserting it): *Creo que tienes razón.*\n\n**No creo que… / No me parece que…** + **subjunctive** (now it\'s doubt): *No creo que tenga razón.*',
        why:
          'This is the indicative-vs-subjunctive rule doing real work in conversation: assert an opinion as your reality → indicative; deny or doubt it → subjunctive. Same trigger, flipped by the "no".',
      },
      {
        heading: 'Agreeing & disagreeing',
        body:
          '**Agree:** Estoy de acuerdo. · Tienes razón. · Exacto. · Claro.\n\n**Disagree (politely):** No estoy de acuerdo. · Bueno, pero… · Entiendo, sin embargo… · Depende.',
      },
      {
        heading: 'Connectors that level you up',
        body:
          '**Add:** además (besides) · también\n**Contrast:** sin embargo (however) · pero · aunque\n**Cause/effect:** por eso (that\'s why) · porque · así que (so)\n**Example:** por ejemplo',
        examples: [
          { es: 'Me parece que el examen fue justo; sin embargo, fue muy largo.', en: 'I think the exam was fair; however, it was very long.' },
          { es: 'No creo que sea buena idea, porque no tenemos tiempo.', en: "I don't think it's a good idea, because we don't have time.", note: 'No creo que → sea (subjunctive).' },
        ],
      },
    ],
    keyTakeaways: [
      'Creo que + indicative; No creo que + subjunctive.',
      'Keep a few agree/disagree phrases ready (estoy de acuerdo, depende, sin embargo).',
      'Connectors (además, sin embargo, por eso) turn sentences into a real argument.',
    ],
  },

  // =========================================================================
  // CONVERSATION: HYPOTHETICALS & THE UNEXPECTED
  // =========================================================================
  {
    topic: 'conversation-hypothetical',
    title: 'Conversation: hypotheticals & the unexpected',
    estMinutes: 9,
    intro:
      'The top of Advanced is handling the unplanned — "what would you do if…", reacting to surprises, and speculating. This puts your past subjunctive and conditional to work in live conversation.',
    sections: [
      {
        heading: 'The core pattern',
        body:
          'For hypotheticals, lean on `Si + past subjunctive , conditional`: *Si pudiera vivir en otro país, viviría en Costa Rica.* And give advice with **Yo que tú…** or **Yo en tu lugar…** ("If I were you…") + conditional.',
        why:
          'These patterns let you handle any "imagine that…" prompt without scrambling. Once "Si + ‑ra, …‑ría" is automatic, unexpected questions stop being scary — you have a frame ready to pour any idea into.',
      },
      {
        heading: 'Reacting in the moment',
        body:
          '**Surprise:** ¿En serio? · ¡No me digas! · ¡Qué sorpresa!\n**Buying time on a hard question:** Uf, buena pregunta… · Nunca lo había pensado… (I\'d never thought about it) · Supongo que…\n**Speculating:** Tal vez… / Quizás… (+ subjunctive) · A lo mejor… (+ indicative)',
      },
      {
        heading: 'Practice prompts in action',
        body: '',
        examples: [
          { es: '¿Qué harías si te ganaras la lotería?', en: 'What would you do if you won the lottery?', note: 'Answer: "Si me ganara la lotería, …‑ría."' },
          { es: 'Si pudieras viajar a cualquier lugar, ¿adónde irías?', en: 'If you could travel anywhere, where would you go?' },
          { es: 'Imagina que pierdes tu vuelo. ¿Qué haces?', en: 'Imagine you miss your flight. What do you do?', note: 'React + plan: "Bueno, primero…"' },
        ],
      },
    ],
    keyTakeaways: [
      'Hypotheticals: Si + past subjunctive, + conditional.',
      'Give advice with "Yo que tú…" / "Yo en tu lugar…" + conditional.',
      'Keep reaction phrases ready (¿en serio?, buena pregunta, supongo que…) to stay fluent under pressure.',
    ],
  },
];

export const LESSON_BY_TOPIC: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.topic, l]),
);
