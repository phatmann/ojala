import { useMemo, useState } from 'react';
import { useRoute, navigate } from '../lib/router';
import { exercisesForTopic } from '../data/exercises';
import { TOPIC_BY_ID } from '../data/topics';
import { LESSON_BY_TOPIC } from '../data/lessons';
import { useStore } from '../state/store';
import { ExerciseRunner } from './ExerciseRunner';
import type { Exercise } from '../types';

interface Props {
  /** 'oral' restricts to speaking + listening exercises. */
  mode?: 'all' | 'oral';
}

// Runs a set of exercises for one topic, tracks score, records progress, and
// (if launched from a plan session) marks the session complete.
export function Practice({ mode = 'all' }: Props) {
  const route = useRoute();
  const topicId = route.segments[1];
  const sessionId = route.query.session;
  const { recordAnswer, completeSession } = useStore();

  const topic = topicId ? TOPIC_BY_ID[topicId] : undefined;

  const exercises = useMemo<Exercise[]>(() => {
    if (!topicId) return [];
    let list = exercisesForTopic(topicId);
    if (mode === 'oral') {
      list = list.filter((e) => e.type === 'speaking' || e.type === 'listening');
    }
    return list;
  }, [topicId, mode]);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!topic || exercises.length === 0) {
    return (
      <div className="screen narrow">
        <div className="card">
          <p>
            {mode === 'oral'
              ? 'No speaking exercises for this topic yet.'
              : 'No practice available for this topic yet.'}
          </p>
          <button className="btn primary" onClick={() => navigate('/')}>
            ← Dashboard
          </button>
        </div>
      </div>
    );
  }

  function handleComplete(correct: boolean) {
    recordAnswer(topicId!, correct);
    if (correct) setScore((s) => s + 1);
    if (i + 1 < exercises.length) {
      setI(i + 1);
    } else {
      if (sessionId) completeSession(sessionId);
      setFinished(true);
    }
  }

  if (finished) {
    const pct = Math.round((score / exercises.length) * 100);
    const hasLesson = !!LESSON_BY_TOPIC[topicId!];
    return (
      <div className="screen narrow">
        <div className="card celebrate">
          <h1>{pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}</h1>
          <p className="big-score">
            {score} / {exercises.length} correct ({pct}%)
          </p>
          <p className="muted">Your mastery of {topic.shortTitle} has been updated.</p>
          <div className="row center">
            <button
              className="btn primary"
              onClick={() => {
                setI(0);
                setScore(0);
                setFinished(false);
              }}
            >
              Practice again
            </button>
            {hasLesson && (
              <button className="btn ghost" onClick={() => navigate(`/lesson/${topicId}`)}>
                Review the lesson
              </button>
            )}
            <button className="btn ghost" onClick={() => navigate('/')}>
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen narrow">
      <button className="link back" onClick={() => navigate('/')}>
        ← Dashboard
      </button>
      <div className="practice-head">
        <h1>
          {mode === 'oral' ? '🎙 Speak: ' : 'Practice: '}
          {topic.title}
        </h1>
        {LESSON_BY_TOPIC[topicId!] && (
          <button className="link" onClick={() => navigate(`/lesson/${topicId}`)}>
            Need a refresher? Read the lesson →
          </button>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(i / exercises.length) * 100}%` }}
        />
      </div>

      <ExerciseRunner
        key={exercises[i].id}
        exercise={exercises[i]}
        onComplete={handleComplete}
        index={i}
        total={exercises.length}
      />
    </div>
  );
}
