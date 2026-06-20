import { useState } from 'react';
import { LEVELS, LEVEL_LABELS, LEVEL_COURSE, type Level } from '../types';
import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { LevelGuide } from './LevelGuide';

// One-line description of what each goal level means, to help the learner pick.
const GOAL_BLURB: Partial<Record<Level, string>> = {
  'intermediate-low': 'Hold simple conversations on familiar, everyday topics.',
  'intermediate-mid': 'Handle everyday situations in sentences and short paragraphs.',
  'intermediate-high': 'Narrate and describe across past, present, and future fairly well.',
  'advanced-low': 'Tell full stories and handle most situations with ease.',
  'advanced-mid': 'Discuss abstract topics and deal with the unexpected.',
  'advanced-high': 'Communicate fluently and precisely — near-native range.',
};

const RECOMMENDED: Level = 'advanced-low';

// Goal-setting: the learner chooses where they want to get to and by when.
export function Onboarding() {
  const { state, setGoal } = useStore();
  const [name, setName] = useState(state.learnerName ?? '');
  // Start with no level chosen so the screen invites a choice instead of
  // appearing to assign one. (Keeps an earlier choice if reconfiguring.)
  const [goal, setGoalLevel] = useState<Level | null>(state.goalLevel ?? null);
  const [weeks, setWeeks] = useState(state.weeks ?? 8);
  const [daysPerWeek, setDays] = useState(state.daysPerWeek ?? 5);

  // Offer goals from Intermediate upward — that's where this learner lives.
  const goalChoices = LEVELS.filter(
    (l) => l.startsWith('intermediate') || l.startsWith('advanced'),
  );

  function submit() {
    if (!goal) return;
    setGoal(name.trim() || undefined, goal, weeks, daysPerWeek);
    navigate('/placement');
  }

  return (
    <div className="screen narrow">
      <h1 className="brand">Ojalá</h1>
      <p className="tagline">
        Your guided Spanish coach. Set a goal, take a quick placement test, and
        get a personalized plan with lessons that explain the <em>why</em>, lots
        of practice, and real speaking and listening.
      </p>

      <div className="card">
        <h2>Let's set your goal</h2>

        <label className="field">
          <span>What should we call you? <span className="muted">(optional)</span></span>
          <input
            className="text-input"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <div className="field">
          <span className="field-label">
            Which level are you aiming for?{' '}
            <span className="muted">— tap the one you want to reach</span>
          </span>
          <p className="muted small no-top">
            This is your <strong>goal</strong>, not your current level — the
            placement test next will figure out where you are now.
          </p>

          <div className="goal-options">
            {goalChoices.map((l) => {
              const selected = goal === l;
              return (
                <button
                  key={l}
                  type="button"
                  className={`goal-option ${selected ? 'selected' : ''}`}
                  aria-pressed={selected}
                  onClick={() => setGoalLevel(l)}
                >
                  <span className="goal-radio" aria-hidden>
                    {selected ? '●' : '○'}
                  </span>
                  <span className="goal-text">
                    <span className="goal-title">
                      {LEVEL_LABELS[l]}
                      <span className="goal-course">≈ {LEVEL_COURSE[l]}</span>
                    </span>
                    {GOAL_BLURB[l] && (
                      <span className="muted small">{GOAL_BLURB[l]}</span>
                    )}
                  </span>
                  {l === RECOMMENDED && (
                    <span className="rec-pill">★ Recommended</span>
                  )}
                </button>
              );
            })}
          </div>

          <LevelGuide highlight={goal ?? undefined} />
        </div>

        <label className="field">
          <span>
            In how many weeks? <strong>{weeks}</strong>
          </span>
          <input
            type="range"
            min={2}
            max={24}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>
            How many study days per week? <strong>{daysPerWeek}</strong>
          </span>
          <input
            type="range"
            min={2}
            max={7}
            value={daysPerWeek}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </label>

        <button className="btn primary big" disabled={!goal} onClick={submit}>
          {goal
            ? 'Next: take the placement test →'
            : 'Pick a goal level to continue'}
        </button>
      </div>
    </div>
  );
}
