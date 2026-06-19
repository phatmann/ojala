import { TOPICS } from '../data/topics';
import { LESSON_BY_TOPIC } from '../data/lessons';
import { exercisesForTopic } from '../data/exercises';
import { CATEGORY_LABELS, LEVEL_LABELS, type TopicCategory } from '../types';
import { navigate } from '../lib/router';
import { useStore } from '../state/store';

// Browse every topic at any level — independent of the plan. Lets the learner
// study or practice anything, anytime. Works across all levels.
export function Library() {
  const { state } = useStore();

  const categories = Object.keys(CATEGORY_LABELS) as TopicCategory[];

  return (
    <div className="screen">
      <button className="link back" onClick={() => navigate('/')}>
        ← Dashboard
      </button>
      <h1>Topic library</h1>
      <p className="muted">
        Every concept, at every level. Jump into any lesson or practice set —
        great for review or for working ahead.
      </p>

      {categories.map((cat) => {
        const topics = TOPICS.filter((t) => t.category === cat);
        if (topics.length === 0) return null;
        return (
          <div key={cat} className="lib-category">
            <h2>{CATEGORY_LABELS[cat]}</h2>
            <div className="topic-grid">
              {topics.map((t) => {
                const mastery = state.progress[t.id]?.mastery ?? 50;
                const hasLesson = !!LESSON_BY_TOPIC[t.id];
                const exCount = exercisesForTopic(t.id).length;
                return (
                  <div key={t.id} className="topic-card static">
                    <div className="topic-card-head">
                      <strong>{t.title}</strong>
                      <span className="level-tag">{LEVEL_LABELS[t.level]}</span>
                    </div>
                    <span className="muted small">{t.summary}</span>
                    <div className="mastery-row">
                      <div className="progress-bar thin">
                        <div className="progress-fill" style={{ width: `${mastery}%` }} />
                      </div>
                      <span className="muted small">{mastery}%</span>
                    </div>
                    <div className="row">
                      {hasLesson && (
                        <button
                          className="btn small"
                          onClick={() => navigate(`/lesson/${t.id}`)}
                        >
                          📖 Lesson
                        </button>
                      )}
                      {exCount > 0 && (
                        <button
                          className="btn small ghost"
                          onClick={() => navigate(`/practice/${t.id}`)}
                        >
                          ✎ Practice ({exCount})
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
