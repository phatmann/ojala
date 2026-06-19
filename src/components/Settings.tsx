import { useEffect, useState } from 'react';
import { useStore } from '../state/store';
import { navigate } from '../lib/router';
import { LEVELS, LEVEL_LABELS, type Level } from '../types';
import { loadVoices, speak, speechSupport } from '../lib/speech';

// Adjust the goal/plan, tune the speaking voice, and reset progress.
export function Settings() {
  const { state, setGoal, buildPlan, setVoice, reset } = useStore();
  const [goal, setGoalLevel] = useState<Level>(state.goalLevel ?? 'advanced-low');
  const [weeks, setWeeks] = useState(state.weeks ?? 8);
  const [days, setDays] = useState(state.daysPerWeek ?? 5);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    loadVoices().then((vs) => setVoices(vs.filter((v) => v.lang.toLowerCase().startsWith('es'))));
  }, []);

  function regenerate() {
    setGoal(state.learnerName, goal, weeks, days);
    buildPlan();
    navigate('/plan');
  }

  function confirmReset() {
    if (confirm('Reset everything — your goal, plan, and all progress? This cannot be undone.')) {
      reset();
      navigate('/onboarding');
    }
  }

  return (
    <div className="screen narrow">
      <button className="link back" onClick={() => navigate('/')}>
        ← Dashboard
      </button>
      <h1>Settings</h1>

      <div className="card">
        <h2>Goal &amp; plan</h2>
        <label className="field">
          <span>Target level</span>
          <select className="select" value={goal} onChange={(e) => setGoalLevel(e.target.value as Level)}>
            {LEVELS.filter((l) => !l.startsWith('novice')).map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABELS[l]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Weeks: <strong>{weeks}</strong></span>
          <input type="range" min={2} max={24} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} />
        </label>
        <label className="field">
          <span>Days per week: <strong>{days}</strong></span>
          <input type="range" min={2} max={7} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </label>
        <p className="muted small">
          Regenerating keeps your mastery from past practice but rebuilds the
          schedule around your new goal.
        </p>
        <button className="btn primary" onClick={regenerate}>
          Regenerate my plan
        </button>
      </div>

      <div className="card">
        <h2>Speaking voice</h2>
        {!speechSupport.tts ? (
          <p className="muted">Text-to-speech isn't available in this browser.</p>
        ) : (
          <>
            <label className="field">
              <span>Accent / voice</span>
              <select
                className="select"
                value={state.voice.lang}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="es-ES">Spanish (Spain) — es-ES</option>
                <option value="es-MX">Spanish (Mexico) — es-MX</option>
                <option value="es-US">Spanish (US) — es-US</option>
                <option value="es-AR">Spanish (Argentina) — es-AR</option>
              </select>
              <span className="muted small">
                {voices.length} Spanish voice{voices.length === 1 ? '' : 's'} found on this device.
              </span>
            </label>
            <label className="field">
              <span>Speaking speed: <strong>{state.voice.rate.toFixed(2)}×</strong></span>
              <input
                type="range"
                min={0.6}
                max={1.2}
                step={0.05}
                value={state.voice.rate}
                onChange={(e) => setVoice(undefined, Number(e.target.value))}
              />
            </label>
            <button
              className="btn ghost"
              onClick={() =>
                speak('Hola, así sueno yo. ¿Practicamos un poco de español?', {
                  lang: state.voice.lang,
                  rate: state.voice.rate,
                })
              }
            >
              🔊 Test the voice
            </button>
          </>
        )}
      </div>

      <div className="card danger">
        <h2>Reset</h2>
        <p className="muted">Clear your goal, plan, and progress to start fresh.</p>
        <button className="btn danger" onClick={confirmReset}>
          Reset everything
        </button>
      </div>
    </div>
  );
}
