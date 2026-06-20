import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { LEVEL_LABELS, LEVEL_COURSE, SESSION_KIND_LABELS, type PlanSession } from '../types';
import { TOPIC_BY_ID } from '../data/topics';
import { planProgress } from '../state/plan';

// Home screen: greeting, streak, overall progress, and the next sessions to do.
export function Dashboard() {
  const { state } = useStore();
  const plan = state.plan;

  if (!plan) {
    return (
      <div className="screen narrow">
        <div className="card">
          <h2>Let's get started</h2>
          <p>Set your goal and take the placement test to get your plan.</p>
          <button className="btn primary" onClick={() => navigate('/onboarding')}>
            Set up my plan →
          </button>
        </div>
      </div>
    );
  }

  const prog = planProgress(plan, state.completedSessions);
  const remaining = plan.sessions.filter((s) => !state.completedSessions.includes(s.id));
  const upNext = remaining.slice(0, 4);
  const greeting = state.learnerName ? `¡Hola, ${state.learnerName}!` : '¡Hola!';

  return (
    <div className="screen">
      <div className="dash-header">
        <div>
          <h1>{greeting}</h1>
          <p className="muted">
            Goal: <strong>{LEVEL_LABELS[plan.goalLevel]}</strong> (≈ {LEVEL_COURSE[plan.goalLevel]}) in {plan.weeks} weeks
            {state.estimatedLevel && (
              <> · Starting from {LEVEL_LABELS[state.estimatedLevel]}</>
            )}
          </p>
        </div>
        <div className="streak" title="Day streak">
          🔥 {state.streak.count}
          <span className="muted small">day streak</span>
        </div>
      </div>

      <div className="stat-grid">
        <Stat label="Plan complete" value={`${prog.pct}%`} />
        <Stat label="Sessions done" value={`${prog.done}/${prog.total}`} />
        <Stat label="Avg. mastery" value={`${avgMastery(state.progress)}%`} />
      </div>

      <div className="progress-bar large">
        <div className="progress-fill" style={{ width: `${prog.pct}%` }} />
      </div>

      <div className="section-head">
        <h2>Up next</h2>
        <button className="link" onClick={() => navigate('/plan')}>
          View full plan →
        </button>
      </div>

      {upNext.length === 0 ? (
        <div className="card celebrate">
          <h3>🎉 You finished your plan!</h3>
          <p>
            Increase your goal in Settings to generate a new plan, or keep
            practicing any topic from the Library.
          </p>
          <button className="btn primary" onClick={() => navigate('/library')}>
            Browse the Library →
          </button>
        </div>
      ) : (
        <div className="session-list">
          {upNext.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </div>
      )}

      <div className="quick-links">
        <button className="tile" onClick={() => navigate('/library')}>
          <span className="tile-icon">📚</span> Topic library
        </button>
        <button className="tile" onClick={() => navigate('/oral')}>
          <span className="tile-icon">🎙</span> Speaking practice
        </button>
        <button className="tile" onClick={() => navigate('/settings')}>
          <span className="tile-icon">⚙️</span> Settings
        </button>
      </div>
    </div>
  );
}

export function SessionRow({ session }: { session: PlanSession }) {
  const { state } = useStore();
  const done = state.completedSessions.includes(session.id);
  const topic = TOPIC_BY_ID[session.topic];

  function go() {
    const dest =
      session.kind === 'learn'
        ? `/lesson/${session.topic}?session=${session.id}`
        : session.kind === 'oral'
          ? `/oral/${session.topic}?session=${session.id}`
          : `/practice/${session.topic}?session=${session.id}`;
    navigate(dest);
  }

  return (
    <button className={`session-row ${done ? 'done' : ''}`} onClick={go}>
      <span className={`kind-pill ${session.kind}`}>
        {SESSION_KIND_LABELS[session.kind]}
      </span>
      <span className="session-title">
        {session.title}
        <span className="muted small block">
          Week {session.week} · Day {session.day} · ~{session.minutes} min
          {topic ? ` · ${topic.summary}` : ''}
        </span>
      </span>
      <span className="session-status">{done ? '✓' : '→'}</span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function avgMastery(progress: Record<string, { mastery: number }>): number {
  const vals = Object.values(progress).map((p) => p.mastery);
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
