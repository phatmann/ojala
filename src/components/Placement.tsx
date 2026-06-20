import { useEffect, useRef, useState } from 'react';
import {
  initEngine,
  nextQuestion,
  record,
  isDone,
  askedQuestions,
  PLACEMENT_TARGET_LEN,
  type EngineState,
} from '../state/placementEngine';
import { scorePlacement, type PlacementResult } from '../state/scoring';
import { LEVEL_PLAIN, PLACEMENT_AREA_LABELS, type PlacementQuestion } from '../types';
import { TOPIC_BY_ID } from '../data/topics';
import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { Markdown } from './Markdown';
import { SpeakButton } from './SpeakButton';
import { matchesAny } from '../lib/text';

// The adaptive placement test. Starts a couple levels below the goal, samples a
// wide variety of skill areas, then narrows in — and works for absolute
// beginners (it opens with basic questions asked in English).
export function Placement() {
  const { state, completePlacement, buildPlan } = useStore();
  const goal = state.goalLevel ?? 'intermediate-mid';

  // Whether this run is a retake (the learner already has a placement on file).
  const [isRetake] = useState(state.placementDone);
  const [engine, setEngine] = useState<EngineState>(() => initEngine(goal));
  const [current, setCurrent] = useState<PlacementQuestion | null>(() =>
    nextQuestion(engine),
  );
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [value, setValue] = useState('');
  const [lastCorrect, setLastCorrect] = useState(false);
  const [result, setResult] = useState<PlacementResult | null>(null);

  function grade() {
    if (!current) return;
    let correct = false;
    if (current.type === 'multiple-choice' || current.type === 'listening') {
      correct = picked === current.answer;
    } else {
      correct = matchesAny(value, current.accepted);
    }
    setEngine(record(engine, current, correct));
    setLastCorrect(correct);
    setAnswered(true);
  }

  function next() {
    // `engine` already reflects the just-recorded answer at this render.
    if (isDone(engine)) {
      const qs = askedQuestions(engine);
      setResult(scorePlacement(qs, engine.correct, engine.ability));
    } else {
      setCurrent(nextQuestion(engine));
      setAnswered(false);
      setPicked(null);
      setValue('');
    }
  }

  function retake() {
    const e = initEngine(goal);
    setEngine(e);
    setCurrent(nextQuestion(e));
    setResult(null);
    setAnswered(false);
    setPicked(null);
    setValue('');
  }

  if (result) {
    return (
      <Results
        result={result}
        isRetake={isRetake}
        onRetake={retake}
        onCommitInitial={() => {
          completePlacement(result, false);
          buildPlan();
          navigate('/');
        }}
        onSaveLevel={() => {
          completePlacement(result, true);
          navigate('/');
        }}
        onSaveAndRebuild={() => {
          completePlacement(result, true);
          buildPlan();
          navigate('/plan');
        }}
      />
    );
  }

  if (!current) {
    return (
      <div className="screen narrow">
        <div className="card">
          <p>Couldn't load the test. Please try again.</p>
          <button className="btn primary" onClick={retake}>Restart</button>
        </div>
      </div>
    );
  }

  const n = engine.asked.length + (answered ? 0 : 1);
  const pct = Math.min(95, Math.round((engine.asked.length / PLACEMENT_TARGET_LEN) * 100));

  return (
    <div className="screen narrow">
      <div className="progress-line">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="muted small">Question {n}</span>
      </div>
      <p className="muted small center no-top">
        The test adapts to your answers, so the length varies. Just answer
        honestly — it's fine to get things wrong.
      </p>

      <div className="card">
        <div className="exercise-head">
          <span className="badge">{PLACEMENT_AREA_LABELS[current.area]}</span>
        </div>

        <QuestionBody
          q={current}
          answered={answered}
          picked={picked}
          onPick={setPicked}
          value={value}
          onValue={setValue}
          onEnter={grade}
        />

        {answered && (
          <div className={`feedback ${lastCorrect ? 'ok' : 'no'}`}>
            <div className="feedback-title">
              {lastCorrect ? '✓ Correct' : '✗ Not quite'}
            </div>
            <Markdown text={current.explanation} />
          </div>
        )}

        {!answered ? (
          <button
            className="btn primary"
            disabled={!canCheck(current, picked, value)}
            onClick={grade}
          >
            Check
          </button>
        ) : (
          <button className="btn primary" onClick={next}>
            {isDone(engine) ? 'See my results →' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  );
}

function canCheck(
  q: PlacementQuestion,
  picked: number | null,
  value: string,
): boolean {
  if (q.type === 'multiple-choice' || q.type === 'listening') return picked !== null;
  return value.trim().length > 0;
}

// ---------------------------------------------------------------------------

interface BodyProps {
  q: PlacementQuestion;
  answered: boolean;
  picked: number | null;
  onPick: (i: number) => void;
  value: string;
  onValue: (v: string) => void;
  onEnter: () => void;
}

function QuestionBody({ q, answered, picked, onPick, value, onValue, onEnter }: BodyProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (q.type === 'fill-blank' || q.type === 'translate') inputRef.current?.focus();
  }, [q.id, q.type]);

  if (q.type === 'multiple-choice' || q.type === 'listening') {
    return (
      <div>
        {q.type === 'listening' ? (
          <div className="listen-block">
            <p className="prompt q">🎧 Listen, then answer:</p>
            <SpeakButton text={q.audioText} label="Play audio" className="big" />
            <p className="prompt">{q.prompt}</p>
          </div>
        ) : (
          <>
            <p className="prompt big-prompt">{q.prompt}</p>
            {q.english && <p className="muted">{q.english}</p>}
          </>
        )}
        <div className="options">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            let cls = 'option';
            if (answered && isAnswer) cls += ' correct';
            else if (answered && isPicked && !isAnswer) cls += ' wrong';
            else if (isPicked) cls += ' picked';
            return (
              <button key={i} className={cls} disabled={answered} onClick={() => onPick(i)}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // fill-blank or translate → typed answer
  const accepted = q.accepted;
  const correct = matchesAny(value, accepted);
  return (
    <div>
      {q.type === 'fill-blank' ? (
        <>
          <p className="prompt big-prompt">{q.prompt}</p>
          {q.english && <p className="muted">{q.english}</p>}
          {q.hint && <p className="hint">💡 {q.hint}</p>}
        </>
      ) : (
        <>
          <p className="prompt">
            Translate into {q.direction === 'en-es' ? 'Spanish' : 'English'}:
          </p>
          <p className="big-prompt">“{q.prompt}”</p>
        </>
      )}
      <input
        ref={inputRef}
        className="text-input"
        value={value}
        disabled={answered}
        placeholder="Type your answer…"
        onChange={(e) => onValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !answered && value.trim()) onEnter();
        }}
      />
      {answered && !correct && (
        <p className="answer-reveal">
          Answer: <strong>{accepted[0]}</strong>
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

interface ResultsProps {
  result: PlacementResult;
  isRetake: boolean;
  onRetake: () => void;
  onCommitInitial: () => void;
  onSaveLevel: () => void;
  onSaveAndRebuild: () => void;
}

function Results({
  result,
  isRetake,
  onRetake,
  onCommitInitial,
  onSaveLevel,
  onSaveAndRebuild,
}: ResultsProps) {
  const weak = result.weakest
    .filter((t) => (result.masteryByTopic[t] ?? 100) < 70)
    .slice(0, 5);

  return (
    <div className="screen narrow">
      <div className="card">
        <h1>Your results</h1>
        <p className="big-score">
          {result.correct} / {result.total} correct
        </p>
        <p>
          Estimated level:{' '}
          <strong className="accent">{LEVEL_PLAIN[result.estimatedLevel]}</strong>
        </p>

        {weak.length > 0 ? (
          <>
            <h3>Let's focus on these first</h3>
            <ul className="weak-list">
              {weak.map((t) => (
                <li key={t}>
                  <strong>{TOPIC_BY_ID[t]?.title ?? t}</strong>
                  <span className="muted"> — {result.masteryByTopic[t] ?? 0}% so far</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Nice work — no clear weak spots in this round. Your plan will keep pushing you forward.</p>
        )}

        {!isRetake ? (
          <>
            <p className="muted">
              I've built a personalized plan around these results. You can retake
              this test or adjust your goal anytime.
            </p>
            <button className="btn primary big" onClick={onCommitInitial}>
              See my plan →
            </button>
          </>
        ) : (
          <>
            <p className="muted">
              Save your new level (your practice progress is kept), and optionally
              rebuild your plan to match.
            </p>
            <div className="row">
              <button className="btn primary" onClick={onSaveLevel}>
                Save my new level
              </button>
              <button className="btn ghost" onClick={onSaveAndRebuild}>
                Save & rebuild my plan
              </button>
            </div>
          </>
        )}

        <button className="btn ghost small mt" onClick={onRetake}>
          ↺ Retake the test
        </button>
      </div>
    </div>
  );
}
