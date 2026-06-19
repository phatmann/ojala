import type { PlacementQuestion } from '../types';

// A diagnostic spanning the curriculum. Each question is tagged with its topic
// and level so we can estimate an overall level AND pinpoint weak areas.
// Questions are ordered roughly easy → hard.

export const PLACEMENT: PlacementQuestion[] = [
  {
    id: 'q1', topic: 'present-regular', level: 'novice-high',
    prompt: 'Nosotros ___ español en clase.',
    english: 'We speak Spanish in class.',
    options: ['hablo', 'hablas', 'hablamos', 'hablan'], answer: 2,
    explanation: 'nosotros + -ar → -amos: hablamos.',
  },
  {
    id: 'q2', topic: 'ser-estar', level: 'intermediate-low',
    prompt: 'Mi abuela ___ en el hospital esta semana.',
    english: 'My grandmother is in the hospital this week.',
    options: ['es', 'está', 'son', 'están'], answer: 1,
    explanation: 'Location of a person → estar: está.',
  },
  {
    id: 'q3', topic: 'present-irregular', level: 'intermediate-low',
    prompt: 'Yo ___ que estudiar para el examen.',
    english: 'I have to study for the exam.',
    options: ['tengo', 'teno', 'tiengo', 'tieno'], answer: 0,
    explanation: 'tener is yo-irregular: tengo.',
  },
  {
    id: 'q4', topic: 'por-vs-para', level: 'intermediate-high',
    prompt: 'Caminamos ___ el parque por la tarde.',
    english: 'We walked through the park in the afternoon.',
    options: ['para', 'por'], answer: 1,
    explanation: 'Movement through a place → por.',
  },
  {
    id: 'q5', topic: 'preterite', level: 'intermediate-mid',
    prompt: 'Ayer yo ___ una película muy buena.',
    english: 'Yesterday I watched a very good movie.',
    options: ['veo', 'veía', 'vi', 'vería'], answer: 2,
    explanation: '"Ayer" + completed event → preterite: vi.',
  },
  {
    id: 'q6', topic: 'imperfect', level: 'intermediate-mid',
    prompt: 'Cuando era niña, ___ al parque todos los días.',
    english: 'When I was a girl, I used to go to the park every day.',
    options: ['fui', 'iba', 'iré', 'voy'], answer: 1,
    explanation: 'Habit in the past ("todos los días") → imperfect: iba.',
  },
  {
    id: 'q7', topic: 'preterite-vs-imperfect', level: 'intermediate-high',
    prompt: 'Yo ___ (leer) cuando, de repente, se fue la luz.',
    english: 'I was reading when, suddenly, the power went out.',
    options: ['leí', 'leía', 'leeré', 'lea'], answer: 1,
    explanation: 'Ongoing action interrupted by an event → imperfect (leía); the interruption (se fue) is preterite.',
  },
  {
    id: 'q8', topic: 'preterite-vs-imperfect', level: 'advanced-low',
    prompt: '"Conocí a tu hermano en la fiesta" means…',
    options: [
      'I already knew your brother at the party',
      'I met your brother (for the first time) at the party',
    ], answer: 1,
    explanation: 'conocer in the preterite = the moment of meeting.',
  },
  {
    id: 'q9', topic: 'present-perfect', level: 'intermediate-high',
    prompt: '___ comido en ese restaurante muchas veces.',
    english: 'I have eaten at that restaurant many times.',
    options: ['He', 'Has', 'Había', 'Habré'], answer: 0,
    explanation: 'Present perfect, yo: he comido.',
  },
  {
    id: 'q10', topic: 'future', level: 'intermediate-high',
    prompt: 'El año que viene yo ___ (estudiar) en México.',
    english: 'Next year I will study in Mexico.',
    options: ['estudio', 'estudiaba', 'estudiaré', 'estudie'], answer: 2,
    explanation: 'Future plan/prediction → simple future: estudiaré.',
  },
  {
    id: 'q11', topic: 'future', level: 'advanced-low',
    prompt: '"Serán las diez de la noche" most naturally means…',
    options: [
      'It will be ten p.m. (later tonight)',
      'It is probably ten p.m. (right now)',
    ], answer: 1,
    explanation: 'The future of probability guesses about the present: "It must be around ten."',
  },
  {
    id: 'q12', topic: 'conditional', level: 'advanced-low',
    prompt: '¿___ (poder, tú) ayudarme, por favor?',
    english: 'Could you help me, please?',
    options: ['Puedes', 'Podrás', 'Podrías', 'Pudiste'], answer: 2,
    explanation: 'Polite request → conditional: podrías.',
  },
  {
    id: 'q13', topic: 'subjunctive-vs-indicative', level: 'intermediate-high',
    prompt: 'Estoy seguro de que ella ___ (venir) hoy.',
    english: 'I am sure that she is coming today.',
    options: ['viene', 'venga'], answer: 0,
    explanation: 'Certainty ("estoy seguro") asserts a fact → indicative: viene.',
  },
  {
    id: 'q14', topic: 'subjunctive-vs-indicative', level: 'advanced-low',
    prompt: 'No pienso que ella ___ (venir) hoy.',
    english: 'I don\'t think she is coming today.',
    options: ['viene', 'venga'], answer: 1,
    explanation: 'Negated belief → doubt → subjunctive: venga.',
  },
  {
    id: 'q15', topic: 'subjunctive-present', level: 'advanced-low',
    prompt: 'Mis padres quieren que yo ___ (tener) éxito.',
    english: 'My parents want me to be successful.',
    options: ['tengo', 'tenga', 'tendré', 'tenía'], answer: 1,
    explanation: 'Wish + new subject → present subjunctive: tenga (from tengo).',
  },
  {
    id: 'q16', topic: 'subjunctive-uses', level: 'advanced-low',
    prompt: 'Llámame en cuanto ___ (llegar, tú) a casa.',
    english: 'Call me as soon as you get home.',
    options: ['llegas', 'llegues', 'llegaste', 'llegarás'], answer: 1,
    explanation: 'After "en cuanto", a not-yet-real future event → subjunctive: llegues.',
  },
  {
    id: 'q17', topic: 'subjunctive-uses', level: 'advanced-mid',
    prompt: 'Ojalá que no ___ (llover) durante el partido.',
    english: 'I hope it doesn\'t rain during the game.',
    options: ['llueve', 'llueva', 'llovía', 'lloverá'], answer: 1,
    explanation: 'Ojalá always triggers the subjunctive: llueva.',
  },
  {
    id: 'q18', topic: 'commands', level: 'advanced-low',
    prompt: 'A tu amigo: "No ___ (preocuparse) por el examen."',
    english: 'To your friend: "Don\'t worry about the exam."',
    options: ['te preocupas', 'te preocupes', 'preocúpate', 'preocupas'], answer: 1,
    explanation: 'Negative tú command uses the subjunctive form, pronoun before: no te preocupes.',
  },
];
