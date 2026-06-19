import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { LEVEL_LABELS } from '../types';
import { planProgress } from '../state/plan';
import { SessionRow } from './Dashboard';

// The full week-by-week study plan.
export function PlanView() {
  const { state } = useStore();
  const plan = state.plan;

  if (!plan) {
    return (
      <div className="screen narrow">
        <div className="card">
          <p>No plan yet.</p>
          <button className="btn primary" onClick={() => navigate('/onboarding')}>
            Create my plan →
          </button>
        </div>
      </div>
    );
  }

  const prog = planProgress(plan, state.completedSessions);
  const weeks = Array.from({ length: plan.weeks }, (_, i) => i + 1);

  return (
    <div className="screen">
      <button className="link back" onClick={() => navigate('/')}>
        ← Dashboard
      </button>
      <h1>Your study plan</h1>
      <p className="muted">
        {LEVEL_LABELS[plan.startLevel]} → <strong>{LEVEL_LABELS[plan.goalLevel]}</strong> ·{' '}
        {plan.weeks} weeks · {plan.daysPerWeek} days/week · {prog.done}/{prog.total} done
      </p>

      <div className="progress-bar large">
        <div className="progress-fill" style={{ width: `${prog.pct}%` }} />
      </div>

      {weeks.map((w) => {
        const weekSessions = plan.sessions.filter((s) => s.week === w);
        if (weekSessions.length === 0) return null;
        const weekDone = weekSessions.every((s) =>
          state.completedSessions.includes(s.id),
        );
        return (
          <div key={w} className="week-block">
            <div className="week-head">
              <h2>Week {w}</h2>
              {weekDone && <span className="badge done">✓ Complete</span>}
            </div>
            <div className="session-list">
              {weekSessions.map((s) => (
                <SessionRow key={s.id} session={s} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
