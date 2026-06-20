import { useState } from 'react';
import { LEVELS, LEVEL_COURSE, levelOptionLabel, type Level } from '../types';
import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { LevelGuide } from './LevelGuide';

// Goal-setting: the learner chooses where they want to get to and by when.
export function Onboarding() {
  const { state, setGoal } = useStore();
  const [name, setName] = useState(state.learnerName ?? '');
  const [goal, setGoalLevel] = useState<Level>(state.goalLevel ?? 'advanced-low');
  const [weeks, setWeeks] = useState(state.weeks ?? 8);
  const [daysPerWeek, setDays] = useState(state.daysPerWeek ?? 5);

  // Offer goals from Intermediate upward — that's where this learner lives.
  const goalChoices = LEVELS.filter((l) => l.startsWith('intermediate') || l.startsWith('advanced'));

  function submit() {
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

        <label className="field">
          <span>Which level do you want to reach? <span className="muted">(your goal)</span></span>
          <select
            className="select"
            value={goal}
            onChange={(e) => setGoalLevel(e.target.value as Level)}
          >
            {goalChoices.map((l) => (
              <option key={l} value={l}>
                {levelOptionLabel(l)}
              </option>
            ))}
          </select>
          <span className="muted small">
            Pick where you want to <em>get to</em> — ≈ {LEVEL_COURSE[goal]} in school.
            The placement test will find where you are <em>now</em>.
          </span>
          <LevelGuide highlight={goal} />
        </label>

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

        <button className="btn primary big" onClick={submit}>
          Next: take the placement test →
        </button>
      </div>
    </div>
  );
}
