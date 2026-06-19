import { useRoute, navigate } from '../lib/router';
import { LESSON_BY_TOPIC } from '../data/lessons';
import { TOPIC_BY_ID } from '../data/topics';
import { exercisesForTopic } from '../data/exercises';
import { useStore } from '../state/store';
import { Markdown } from './Markdown';
import { SpeakButton } from './SpeakButton';
import type { ConjugationTable, Example } from '../types';

// Renders a full lesson, with conjugation tables, examples (each speakable),
// and "why" insight callouts.
export function LessonView() {
  const route = useRoute();
  const topicId = route.segments[1];
  const sessionId = route.query.session;
  const { markLessonRead, completeSession } = useStore();

  const lesson = topicId ? LESSON_BY_TOPIC[topicId] : undefined;
  const topic = topicId ? TOPIC_BY_ID[topicId] : undefined;

  if (!lesson || !topic) {
    return (
      <div className="screen narrow">
        <div className="card">
          <p>Lesson not found.</p>
          <button className="btn primary" onClick={() => navigate('/')}>
            ← Dashboard
          </button>
        </div>
      </div>
    );
  }

  const hasPractice = exercisesForTopic(topicId!).length > 0;

  function done() {
    markLessonRead(topicId!);
    if (sessionId) completeSession(sessionId);
    // Flow straight into practice if available, else back to dashboard.
    if (hasPractice) navigate(`/practice/${topicId}`);
    else navigate('/');
  }

  return (
    <div className="screen narrow lesson">
      <button className="link back" onClick={() => history.length > 1 ? history.back() : navigate('/')}>
        ← Back
      </button>

      <span className="badge">{topic.shortTitle}</span>
      <h1>{lesson.title}</h1>
      <p className="muted small">📖 about {lesson.estMinutes} min</p>
      <div className="lead">
        <Markdown text={lesson.intro} />
      </div>

      {lesson.sections.map((sec, i) => (
        <section key={i} className="lesson-section">
          {sec.heading && <h2>{sec.heading}</h2>}
          {sec.body && <Markdown text={sec.body} />}
          {sec.table && <Table table={sec.table} />}
          {sec.examples && <Examples examples={sec.examples} />}
          {sec.why && (
            <div className="why-box">
              <span className="why-tag">Why it works</span>
              <Markdown text={sec.why} />
            </div>
          )}
        </section>
      ))}

      <div className="takeaways">
        <h2>Key takeaways</h2>
        <ul>
          {lesson.keyTakeaways.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>
      </div>

      <div className="lesson-actions">
        <button className="btn primary big" onClick={done}>
          {hasPractice ? 'Got it — practice now →' : 'Mark as read ✓'}
        </button>
      </div>
    </div>
  );
}

function Table({ table }: { table: ConjugationTable }) {
  return (
    <div className="table-wrap">
      {table.caption && <div className="table-caption">{table.caption}</div>}
      <table className="conj-table">
        <thead>
          <tr>
            {table.columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={ci === 0 ? 'rowhead' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Examples({ examples }: { examples: Example[] }) {
  return (
    <div className="examples">
      {examples.map((ex, i) => (
        <div key={i} className="example">
          <div className="example-main">
            <span className="es">{ex.es}</span>
            <SpeakButton text={ex.es} label="" />
          </div>
          <div className="en muted">{ex.en}</div>
          {ex.note && <div className="note">→ {ex.note}</div>}
        </div>
      ))}
    </div>
  );
}
