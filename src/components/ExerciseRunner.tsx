import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise } from '../types';
import { EXERCISE_TYPE_LABELS } from '../types';
import { matchesAny, judgeSpoken, normalize } from '../lib/text';
import { listen, speechSupport, type ListenHandle } from '../lib/speech';
import { SpeakButton } from './SpeakButton';
import { Markdown } from './Markdown';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  index?: number;
  total?: number;
}

export function ExerciseRunner({ exercise, onComplete, index, total }: Props) {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  // Reset internal state when the exercise changes.
  const key = exercise.id;

  function finish(wasCorrect: boolean) {
    setCorrect(wasCorrect);
    setAnswered(true);
  }

  return (
    <div className="exercise" key={key}>
      <div className="exercise-head">
        <span className="badge">{EXERCISE_TYPE_LABELS[exercise.type]}</span>
        {index != null && total != null && (
          <span className="muted small">
            {index + 1} / {total}
          </span>
        )}
        <span className="difficulty" title="Difficulty">
          {'●'.repeat(exercise.difficulty)}
          <span className="dim">{'●'.repeat(5 - exercise.difficulty)}</span>
        </span>
      </div>

      <Body exercise={exercise} answered={answered} onAnswer={finish} />

      {answered && (
        <div className={`feedback ${correct ? 'ok' : 'no'}`}>
          <div className="feedback-title">
            {correct ? '✓ Correct!' : '✗ Not quite'}
          </div>
          <div className="why-label">Why</div>
          <Markdown text={exercise.explanation} />
          <button className="btn primary" onClick={() => onComplete(correct)}>
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

interface BodyProps {
  exercise: Exercise;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}

function Body({ exercise, answered, onAnswer }: BodyProps) {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listening':
      return <ChoiceBody exercise={exercise} answered={answered} onAnswer={onAnswer} />;
    case 'fill-blank':
    case 'conjugate':
    case 'translate':
      return <TextBody exercise={exercise} answered={answered} onAnswer={onAnswer} />;
    case 'reorder':
      return <ReorderBody exercise={exercise} answered={answered} onAnswer={onAnswer} />;
    case 'speaking':
      return <SpeakingBody exercise={exercise} answered={answered} onAnswer={onAnswer} />;
  }
}

// --- Multiple choice / listening -------------------------------------------

function ChoiceBody({ exercise, answered, onAnswer }: BodyProps) {
  const ex = exercise as Extract<Exercise, { options: string[]; answer: number }>;
  const [picked, setPicked] = useState<number | null>(null);
  const isListening = exercise.type === 'listening';

  return (
    <div>
      {isListening ? (
        <div className="listen-block">
          <p className="prompt">🎧 Listen, then answer:</p>
          <SpeakButton text={(exercise as any).audioText} label="Play audio" className="big" />
          <p className="prompt q">{ex.prompt}</p>
        </div>
      ) : (
        <p className="prompt">{ex.prompt}</p>
      )}

      <div className="options">
        {ex.options.map((opt, i) => {
          const isAnswer = i === ex.answer;
          const isPicked = i === picked;
          let cls = 'option';
          if (answered && isAnswer) cls += ' correct';
          else if (answered && isPicked && !isAnswer) cls += ' wrong';
          else if (isPicked) cls += ' picked';
          return (
            <button
              key={i}
              className={cls}
              disabled={answered}
              onClick={() => setPicked(i)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!answered && (
        <button
          className="btn primary"
          disabled={picked === null}
          onClick={() => onAnswer(picked === ex.answer)}
        >
          Check
        </button>
      )}
    </div>
  );
}

// --- Free text (fill-blank, conjugate, translate) --------------------------

function TextBody({ exercise, answered, onAnswer }: BodyProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const accepted = (exercise as any).accepted as string[];

  let promptNode: React.ReactNode = null;
  let context: React.ReactNode = null;

  if (exercise.type === 'fill-blank') {
    const parts = exercise.prompt.split('___');
    promptNode = (
      <p className="prompt big-prompt">
        {parts[0]}
        <span className="blank">{answered ? accepted[0] : '_____'}</span>
        {parts[1]}
      </p>
    );
    context = (
      <>
        {exercise.english && <p className="muted">{exercise.english}</p>}
        {exercise.hint && <p className="hint">💡 {exercise.hint}</p>}
      </>
    );
  } else if (exercise.type === 'conjugate') {
    promptNode = (
      <p className="prompt">
        Conjugate <strong>{exercise.verb}</strong> for{' '}
        <strong>{exercise.subject}</strong> in the{' '}
        <strong>{exercise.tense}</strong>.
      </p>
    );
  } else if (exercise.type === 'translate') {
    promptNode = (
      <p className="prompt">
        Translate{' '}
        {exercise.direction === 'en-es' ? 'into Spanish' : 'into English'}:
      </p>
    );
    context = <p className="big-prompt">“{exercise.prompt}”</p>;
  }

  function check() {
    onAnswer(matchesAny(value, accepted));
  }

  return (
    <div>
      {promptNode}
      {context}
      <input
        ref={inputRef}
        className="text-input"
        value={value}
        disabled={answered}
        placeholder="Type your answer…"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !answered && value.trim()) check();
        }}
      />
      {answered && !matchesAny(value, accepted) && (
        <p className="answer-reveal">
          Answer: <strong>{accepted[0]}</strong>
        </p>
      )}
      {!answered && (
        <button className="btn primary" disabled={!value.trim()} onClick={check}>
          Check
        </button>
      )}
    </div>
  );
}

// --- Reorder ---------------------------------------------------------------

function ReorderBody({ exercise, answered, onAnswer }: BodyProps) {
  const ex = exercise as Extract<Exercise, { tokens: string[] }>;
  // Present the tokens shuffled; the correct order is the original array.
  const shuffled = useMemo(() => shuffle(ex.tokens), [ex.id]);
  const [order, setOrder] = useState<number[]>([]);

  const used = new Set(order);
  const built = order.map((i) => shuffled[i]).join(' ');
  const correctSentence = ex.tokens.join(' ');

  function check() {
    onAnswer(normalize(built) === normalize(correctSentence));
  }

  return (
    <div>
      <p className="prompt">{ex.prompt}</p>
      {ex.english && <p className="muted">{ex.english}</p>}

      <div className="reorder-built">
        {order.length === 0 ? (
          <span className="muted">Tap the words in order…</span>
        ) : (
          order.map((tokIdx, pos) => (
            <button
              key={pos}
              className="token built"
              disabled={answered}
              onClick={() => setOrder(order.filter((_, p) => p !== pos))}
            >
              {shuffled[tokIdx]}
            </button>
          ))
        )}
      </div>

      <div className="reorder-bank">
        {shuffled.map((tok, i) =>
          used.has(i) ? null : (
            <button
              key={i}
              className="token"
              disabled={answered}
              onClick={() => setOrder([...order, i])}
            >
              {tok}
            </button>
          ),
        )}
      </div>

      {answered && (
        <p className="answer-reveal">
          Correct order: <strong>{correctSentence}</strong>
        </p>
      )}
      {!answered && (
        <div className="row">
          <button
            className="btn ghost"
            disabled={order.length === 0}
            onClick={() => setOrder([])}
          >
            Reset
          </button>
          <button
            className="btn primary"
            disabled={order.length !== shuffled.length}
            onClick={check}
          >
            Check
          </button>
        </div>
      )}
    </div>
  );
}

// --- Speaking --------------------------------------------------------------

function SpeakingBody({ exercise, answered, onAnswer }: BodyProps) {
  const ex = exercise as Extract<Exercise, { target: string }>;
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleRef = useRef<ListenHandle | null>(null);

  function start() {
    setError(null);
    setTranscript('');
    setScore(null);
    setListening(true);
    handleRef.current = listen({
      lang: 'es-ES',
      onResult: (t, isFinal) => {
        setTranscript(t);
        if (isFinal) {
          const { score: s } = judgeSpoken(t, ex.target);
          setScore(s);
        }
      },
      onError: (e) => {
        setError(
          e === 'not-allowed'
            ? 'Microphone permission was blocked. Allow mic access to practice speaking.'
            : e === 'no-speech'
              ? 'I didn\'t catch that — try again.'
              : 'Speech recognition isn\'t available here.',
        );
        setListening(false);
      },
      onEnd: () => setListening(false),
    });
    if (!handleRef.current) {
      setError('Speech recognition isn\'t supported in this browser. Try Chrome or Edge.');
      setListening(false);
    }
  }

  function stop() {
    handleRef.current?.stop();
    setListening(false);
  }

  function submit() {
    const { pass } = judgeSpoken(transcript, ex.target);
    onAnswer(pass);
  }

  const sttOk = speechSupport.stt;

  return (
    <div>
      <p className="prompt">🎤 {ex.prompt}</p>
      {ex.english && <p className="muted">{ex.english}</p>}

      <div className="speaking-target">
        {revealed || answered ? (
          <>
            <span className="target-text">{ex.target}</span>
            <SpeakButton text={ex.target} label="Hear it" />
          </>
        ) : (
          <button className="btn ghost" onClick={() => setRevealed(true)}>
            👁 Show the sentence to say
          </button>
        )}
      </div>

      {!sttOk && (
        <p className="hint">
          Speech recognition isn't available in this browser. You can still read
          the sentence aloud, reveal it, and mark how you did. (Chrome/Edge
          support live checking.)
        </p>
      )}

      {sttOk && (
        <div className="mic-area">
          {!listening ? (
            <button className="btn mic" onClick={start} disabled={answered}>
              🎙 {transcript ? 'Try again' : 'Start speaking'}
            </button>
          ) : (
            <button className="btn mic recording" onClick={stop}>
              ■ Stop · listening…
            </button>
          )}
        </div>
      )}

      {transcript && (
        <div className="transcript">
          <span className="muted small">I heard:</span> “{transcript}”
          {score != null && (
            <span className={`score ${score >= 0.8 ? 'ok' : 'no'}`}>
              {Math.round(score * 100)}% match
            </span>
          )}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {!answered && (
        <div className="row">
          {sttOk ? (
            <button
              className="btn primary"
              disabled={!transcript}
              onClick={submit}
            >
              Check my pronunciation
            </button>
          ) : (
            <>
              <button className="btn primary" onClick={() => onAnswer(true)}>
                I said it correctly
              </button>
              <button className="btn ghost" onClick={() => onAnswer(false)}>
                I need more practice
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  // Guard against an accidental identity shuffle for short arrays.
  if (a.length > 1 && a.every((v, i) => v === arr[i])) return shuffle(arr);
  return a;
}
