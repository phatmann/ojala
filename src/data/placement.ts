import type { PlacementQuestion } from '../types';

// A broad, multi-level, multi-type question bank for the ADAPTIVE placement
// test. The engine (state/placementEngine.ts) chooses which to ask and in what
// order — this file just needs good coverage across:
//   • every level (Beginner Low → Advanced High)
//   • every skill area (basics, vocab, ser/estar, present, past, future, mood, usage)
//   • every question type (multiple-choice, listening, fill-blank, translate)
//
// Beginner questions are written in English (e.g. "How do you say…") so someone
// who knows little or no Spanish can still answer.

export const PLACEMENT: PlacementQuestion[] = [
  // =======================================================================
  // BEGINNER · LOW  — basics, in English, for true beginners
  // =======================================================================
  {
    id: 'b1', type: 'multiple-choice', area: 'basics', topic: 'basics', level: 'novice-low',
    prompt: 'How do you say "My name is Ana"?',
    options: ['Me llamo Ana', 'Mi llamo es Ana', 'Yo es Ana', 'Llamo Ana'], answer: 0,
    explanation: '"Me llamo…" literally means "I call myself…" — the normal way to give your name.',
  },
  {
    id: 'b2', type: 'multiple-choice', area: 'basics', topic: 'basics', level: 'novice-low',
    prompt: 'What does "Hola" mean?',
    options: ['Hello', 'Goodbye', 'Please', 'Sorry'], answer: 0,
    explanation: '"Hola" = hello/hi.',
  },
  {
    id: 'b3', type: 'multiple-choice', area: 'vocab', topic: 'vocab', level: 'novice-low',
    prompt: 'Choose the Spanish for "thank you".',
    options: ['Gracias', 'Por favor', 'Lo siento', 'De nada'], answer: 0,
    explanation: '"Gracias" = thank you. ("Por favor" = please.)',
  },
  {
    id: 'b4', type: 'multiple-choice', area: 'basics', topic: 'basics', level: 'novice-low',
    prompt: 'How do you say "good morning"?',
    options: ['Buenos días', 'Buenas noches', 'Hasta luego', 'Mucho gusto'], answer: 0,
    explanation: '"Buenos días" = good morning. ("Buenas noches" = good night.)',
  },
  {
    id: 'b5', type: 'multiple-choice', area: 'vocab', topic: 'vocab', level: 'novice-low',
    prompt: 'What do the numbers "uno, dos, tres" mean?',
    options: ['one, two, three', 'three, two, one', 'first, second, third', 'ten, twenty, thirty'], answer: 0,
    explanation: 'uno = 1, dos = 2, tres = 3.',
  },
  {
    id: 'b6', type: 'listening', area: 'basics', topic: 'basics', level: 'novice-low',
    audioText: 'Gracias',
    prompt: 'What does it mean in English?',
    options: ['Thank you', 'Hello', 'Goodbye', 'Please'], answer: 0,
    explanation: 'You heard "Gracias" — it means "thank you".',
  },

  // =======================================================================
  // BEGINNER · MID
  // =======================================================================
  {
    id: 'b7', type: 'multiple-choice', area: 'vocab', topic: 'vocab', level: 'novice-mid',
    prompt: 'What does "gato" mean?',
    options: ['cat', 'dog', 'house', 'water'], answer: 0,
    explanation: '"gato" = cat. ("perro" = dog.)',
  },
  {
    id: 'b8', type: 'multiple-choice', area: 'vocab', topic: 'vocab', level: 'novice-mid',
    prompt: 'Choose "the red house".',
    options: ['la casa roja', 'la roja casa', 'el casa roja', 'la casa rojo'], answer: 0,
    explanation: 'Adjectives usually follow the noun and agree with it: casa (fem.) → roja.',
  },
  {
    id: 'b9', type: 'multiple-choice', area: 'present', topic: 'present-regular', level: 'novice-mid',
    prompt: 'How do you say "I have two brothers"?',
    options: ['Tengo dos hermanos', 'Tienes dos hermanos', 'Tengo dos hermanas', 'Soy dos hermanos'], answer: 0,
    explanation: '"Tengo" = I have. ("hermanas" would be sisters.)',
  },
  {
    id: 'b10', type: 'multiple-choice', area: 'ser-estar', topic: 'ser-estar', level: 'novice-mid',
    prompt: 'Which means "I am a student"?',
    options: ['Soy estudiante', 'Estoy estudiante', 'Tengo estudiante', 'Es estudiante'], answer: 0,
    explanation: 'Identity/occupation uses ser: "Soy estudiante".',
  },
  {
    id: 'b11', type: 'listening', area: 'vocab', topic: 'vocab', level: 'novice-mid',
    audioText: 'agua',
    prompt: 'What does this word mean in English?',
    options: ['water', 'bread', 'milk', 'coffee'], answer: 0,
    explanation: '"agua" = water.',
  },

  // =======================================================================
  // BEGINNER · HIGH
  // =======================================================================
  {
    id: 'b12', type: 'fill-blank', area: 'present', topic: 'present-regular', level: 'novice-high',
    prompt: 'Yo ___ español. (hablar)', english: 'I speak Spanish.', hint: 'hablar — yo',
    accepted: ['hablo'],
    explanation: '-ar verb, yo form: habl- + o = hablo.',
  },
  {
    id: 'b13', type: 'multiple-choice', area: 'present', topic: 'present-regular', level: 'novice-high',
    prompt: 'Nosotros ___ en la escuela.', english: 'We study at school.',
    options: ['estudiamos', 'estudio', 'estudias', 'estudian'], answer: 0,
    explanation: 'nosotros + -ar → -amos: estudiamos.',
  },
  {
    id: 'b14', type: 'multiple-choice', area: 'ser-estar', topic: 'ser-estar', level: 'novice-high',
    prompt: 'Ella ___ cansada hoy.', english: 'She is tired today.',
    options: ['está', 'es', 'son', 'soy'], answer: 0,
    explanation: 'A temporary condition → estar: está.',
  },
  {
    id: 'b15', type: 'translate', area: 'present', topic: 'present-regular', level: 'novice-high',
    direction: 'en-es', prompt: 'I eat bread.',
    accepted: ['como pan', 'yo como pan'],
    explanation: '"Como pan" — comer, yo form: como.',
  },

  // =======================================================================
  // INTERMEDIATE · LOW
  // =======================================================================
  {
    id: 'i1', type: 'multiple-choice', area: 'present', topic: 'present-irregular', level: 'intermediate-low',
    prompt: 'Yo ___ que estudiar para el examen.', english: 'I have to study for the exam.',
    options: ['tengo', 'teno', 'tiengo', 'tieno'], answer: 0,
    explanation: 'tener is yo-irregular: tengo.',
  },
  {
    id: 'i2', type: 'multiple-choice', area: 'ser-estar', topic: 'ser-estar', level: 'intermediate-low',
    prompt: 'Mi abuela ___ en el hospital esta semana.', english: 'My grandmother is in the hospital this week.',
    options: ['está', 'es', 'son', 'están'], answer: 0,
    explanation: 'Location of a person → estar: está.',
  },
  {
    id: 'i3', type: 'fill-blank', area: 'present', topic: 'present-irregular', level: 'intermediate-low',
    prompt: 'Yo ___ la tarea por la noche. (hacer)', english: 'I do the homework at night.', hint: 'hacer — yo',
    accepted: ['hago'],
    explanation: 'hacer is yo-irregular: hago.',
  },
  {
    id: 'i4', type: 'translate', area: 'present', topic: 'present-regular', level: 'intermediate-low',
    direction: 'en-es', prompt: 'We live in a big house.',
    accepted: ['vivimos en una casa grande'],
    explanation: 'vivir, nosotros: vivimos; "una casa grande".',
  },
  {
    id: 'i5', type: 'multiple-choice', area: 'usage', topic: 'por-vs-para', level: 'intermediate-low',
    prompt: 'Este regalo es ___ ti.', english: 'This gift is for you.',
    options: ['para', 'por'], answer: 0,
    explanation: 'Recipient/destination → para.',
  },

  // =======================================================================
  // INTERMEDIATE · MID
  // =======================================================================
  {
    id: 'i6', type: 'multiple-choice', area: 'past', topic: 'preterite', level: 'intermediate-mid',
    prompt: 'Ayer yo ___ una película muy buena.', english: 'Yesterday I watched a very good movie.',
    options: ['vi', 'veo', 'veía', 'veré'], answer: 0,
    explanation: '"Ayer" + a completed event → preterite: vi.',
  },
  {
    id: 'i7', type: 'fill-blank', area: 'past', topic: 'preterite', level: 'intermediate-mid',
    prompt: 'Anoche nosotros ___ al cine. (ir)', english: 'Last night we went to the movies.', hint: 'ir — preterite, nosotros',
    accepted: ['fuimos'],
    explanation: 'ir/ser share preterite forms: fuimos.',
  },
  {
    id: 'i8', type: 'multiple-choice', area: 'past', topic: 'imperfect', level: 'intermediate-mid',
    prompt: 'Cuando era niña, ___ al parque todos los días.', english: 'When I was a girl, I used to go to the park every day.',
    options: ['iba', 'fui', 'iré', 'voy'], answer: 0,
    explanation: 'A past habit ("todos los días") → imperfect: iba.',
  },
  {
    id: 'i9', type: 'listening', area: 'past', topic: 'preterite', level: 'intermediate-mid',
    audioText: 'Ayer comí en un restaurante con mi familia.',
    prompt: 'In English, what is the sentence about?',
    options: ['Eating at a restaurant yesterday', 'Cooking for the family tonight', 'Going to school every day', 'Buying food at the market'], answer: 0,
    explanation: '"Ayer comí en un restaurante con mi familia" = Yesterday I ate at a restaurant with my family.',
  },

  // =======================================================================
  // INTERMEDIATE · HIGH
  // =======================================================================
  {
    id: 'i10', type: 'multiple-choice', area: 'past', topic: 'preterite-vs-imperfect', level: 'intermediate-high',
    prompt: 'Yo ___ (leer) cuando, de repente, se fue la luz.', english: 'I was reading when, suddenly, the power went out.',
    options: ['leía', 'leí', 'leeré', 'lea'], answer: 0,
    explanation: 'Ongoing background action → imperfect (leía); the interruption (se fue) is preterite.',
  },
  {
    id: 'i11', type: 'multiple-choice', area: 'future', topic: 'future', level: 'intermediate-high',
    prompt: 'El año que viene yo ___ (estudiar) en México.', english: 'Next year I will study in Mexico.',
    options: ['estudiaré', 'estudio', 'estudiaba', 'estudie'], answer: 0,
    explanation: 'A future plan → simple future: estudiaré.',
  },
  {
    id: 'i12', type: 'fill-blank', area: 'past', topic: 'present-perfect', level: 'intermediate-high',
    prompt: 'Hoy yo ___ estudiado mucho. (haber)', english: 'Today I have studied a lot.', hint: 'haber — present, yo',
    accepted: ['he'],
    explanation: 'Present perfect: he estudiado. "Hoy" is an open time frame.',
  },
  {
    id: 'i13', type: 'multiple-choice', area: 'usage', topic: 'por-vs-para', level: 'intermediate-high',
    prompt: 'Caminamos ___ el parque por la tarde.', english: 'We walked through the park in the afternoon.',
    options: ['por', 'para'], answer: 0,
    explanation: 'Movement through a place → por.',
  },
  {
    id: 'i14', type: 'multiple-choice', area: 'mood', topic: 'subjunctive-vs-indicative', level: 'intermediate-high',
    prompt: 'Estoy seguro de que ella ___ (venir) hoy.', english: 'I am sure that she is coming today.',
    options: ['viene', 'venga'], answer: 0,
    explanation: 'Certainty asserts a fact → indicative: viene.',
  },
  {
    id: 'i15', type: 'translate', area: 'past', topic: 'preterite', level: 'intermediate-high',
    direction: 'en-es', prompt: 'I ate at eight.',
    accepted: ['comí a las ocho', 'yo comí a las ocho'],
    explanation: 'A completed event at a point in time → preterite: comí.',
  },

  // =======================================================================
  // ADVANCED · LOW
  // =======================================================================
  {
    id: 'a1', type: 'fill-blank', area: 'mood', topic: 'subjunctive-present', level: 'advanced-low',
    prompt: 'Mis padres quieren que yo ___ éxito. (tener)', english: 'My parents want me to be successful.', hint: 'tener — present subjunctive, yo',
    accepted: ['tenga'],
    explanation: 'Wish + new subject → present subjunctive: tenga (from tengo).',
  },
  {
    id: 'a2', type: 'multiple-choice', area: 'mood', topic: 'subjunctive-uses', level: 'advanced-low',
    prompt: 'No pienso que ella ___ (venir) hoy.', english: "I don't think she is coming today.",
    options: ['venga', 'viene'], answer: 0,
    explanation: 'Negated belief → doubt → subjunctive: venga.',
  },
  {
    id: 'a3', type: 'multiple-choice', area: 'future', topic: 'conditional', level: 'advanced-low',
    prompt: '¿___ (poder, tú) ayudarme, por favor?', english: 'Could you help me, please?',
    options: ['Podrías', 'Puedes', 'Podrás', 'Pudiste'], answer: 0,
    explanation: 'Polite request → conditional: podrías.',
  },
  {
    id: 'a4', type: 'multiple-choice', area: 'mood', topic: 'commands', level: 'advanced-low',
    prompt: 'A tu amigo: "No ___ (preocuparse) por el examen."', english: 'To your friend: "Don\'t worry about the exam."',
    options: ['te preocupes', 'te preocupas', 'preocúpate', 'preocupas'], answer: 0,
    explanation: 'Negative tú command uses the subjunctive form, pronoun before: no te preocupes.',
  },
  {
    id: 'a5', type: 'fill-blank', area: 'mood', topic: 'subjunctive-uses', level: 'advanced-low',
    prompt: 'Llámame en cuanto ___ a casa. (llegar, tú)', english: 'Call me as soon as you get home.', hint: 'llegar — present subjunctive, tú',
    accepted: ['llegues'],
    explanation: 'After "en cuanto", a not-yet-real future event → subjunctive: llegues.',
  },

  // =======================================================================
  // ADVANCED · MID / HIGH
  // =======================================================================
  {
    id: 'a6', type: 'multiple-choice', area: 'mood', topic: 'subjunctive-uses', level: 'advanced-mid',
    prompt: 'Aunque ___ caro, lo compraré. (it may turn out to be — hypothetical)', english: 'Even if it is (turns out) expensive, I will buy it.',
    options: ['sea', 'es'], answer: 0,
    explanation: 'Hypothetical/not-asserted with aunque → subjunctive: sea. (Indicative "es" would state it as a known fact.)',
  },
  {
    id: 'a7', type: 'multiple-choice', area: 'past', topic: 'preterite-vs-imperfect', level: 'advanced-mid',
    prompt: '"Conocí a tu hermano en la fiesta" means…',
    options: ['I met your brother (first time) at the party', 'I already knew your brother at the party'], answer: 0,
    explanation: 'conocer in the preterite = the moment of meeting; the imperfect (conocía) = already knew.',
  },
  {
    id: 'a8', type: 'multiple-choice', area: 'mood', topic: 'subjunctive-uses', level: 'advanced-high',
    prompt: 'Si ___ más tiempo, viajaría por el mundo.', english: 'If I had more time, I would travel the world.',
    options: ['tuviera', 'tengo', 'tendré', 'tenga'], answer: 0,
    explanation: 'Contrary-to-fact "if" clauses use the past (imperfect) subjunctive: "Si tuviera…, viajaría…".',
  },
  {
    id: 'a9', type: 'multiple-choice', area: 'future', topic: 'future', level: 'advanced-mid',
    prompt: '"Serán las diez de la noche" most naturally means…',
    options: ['It is probably ten p.m. (right now)', 'It will be ten p.m. (later)'], answer: 0,
    explanation: 'The future of probability guesses about the present: "It must be around ten."',
  },
];
