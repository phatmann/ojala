import { useMemo, useState } from 'react';
import { PLACEMENT } from '../data/placement';
import { scorePlacement, type PlacementResult } from '../state/scoring';
import { LEVEL_PLAIN } from '../types';
import { TOPIC_BY_ID } from '../data/topics';
import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { Markdown } from './Markdown';

// The diagnostic. Walks through each question, then shows results and seeds
// the learner's progress + builds their plan.
export function Placement() {
  const { completePlacement, buildPlan } = useStore();
  const questions = PLACEMENT;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [picked, setPicked] = useState<number | null>(null);
  const [showWhy, setShowWhy] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const result = useMemo<PlacementResult | null>(
    () => (done ? scorePlacement(questions, answers) : null),
    [done, answers, questions],
  );

  function choose(idx: number) {
    if (showWhy) return;
    setPicked(idx);
  }

  function reveal() {
    if (picked === null) return;
    setAnswers((a) => ({ ...a, [q.id]: picked }));
    setShowWhy(true);
  }

  function next() {
    setShowWhy(false);
    setPicked(null);
    if (i + 1 < questions.length) {
      setI(i + 1);
    } else {
      setDone(true);
    }
  }

  function finish() {
    if (!result) return;
    completePlacement(result);
    buildPlan();
    navigate('/');
  }

  if (done && result) {
    return <Results result={result} onFinish={finish} />;
  }

  return (
    <div className="screen narrow">
      <div className="progress-line">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(i / questions.length) * 100}%` }}
          />
        </div>
        <span className="muted small">
          Question {i + 1} of {questions.length}
        </span>
      </div>

      <div className="card">
        <span className="badge">{TOPIC_BY_ID[q.topic]?.shortTitle ?? q.topic}</span>
        <p className="prompt big-prompt">{q.prompt}</p>
        {q.english && <p className="muted">{q.english}</p>}

        <div className="options">
          {q.options.map((opt, idx) => {
            const isAnswer = idx === q.answer;
            const isPicked = idx === picked;
            let cls = 'option';
            if (showWhy && isAnswer) cls += ' correct';
            else if (showWhy && isPicked && !isAnswer) cls += ' wrong';
            else if (isPicked) cls += ' picked';
            return (
              <button key={idx} className={cls} disabled={showWhy} onClick={() => choose(idx)}>
                {opt}
              </button>
            );
          })}
        </div>

        {showWhy && (
          <div className={`feedback ${picked === q.answer ? 'ok' : 'no'}`}>
            <div className="feedback-title">
              {picked === q.answer ? '✓ Correct' : '✗ Not quite'}
            </div>
            <Markdown text={q.explanation} />
          </div>
        )}

        {!showWhy ? (
          <button className="btn primary" disabled={picked === null} onClick={reveal}>
            Check
          </button>
        ) : (
          <button className="btn primary" onClick={next}>
            {i + 1 < questions.length ? 'Next question →' : 'See my results →'}
          </button>
        )}
      </div>
      <p className="muted small center">
        Answer honestly — guessing won't help your plan. It's fine to get things
        wrong; that's how the app learns what to focus on.
      </p>
    </div>
  );
}

function Results({
  result,
  onFinish,
}: {
  result: PlacementResult;
  onFinish: () => void;
}) {
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
          <p>Great work — you're solid across the board. Your plan will keep you sharp and push you higher.</p>
        )}

        <p className="muted">
          I've built a personalized plan around these results. You can adjust your
          goal anytime in Settings.
        </p>
        <button className="btn primary big" onClick={onFinish}>
          See my plan →
        </button>
      </div>
    </div>
  );
}
