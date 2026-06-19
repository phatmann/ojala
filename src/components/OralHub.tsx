import { useEffect, useState } from 'react';
import { TOPICS } from '../data/topics';
import { exercisesForTopic } from '../data/exercises';
import { navigate } from '../lib/router';
import { speechSupport, loadVoices, speak } from '../lib/speech';
import { useStore } from '../state/store';

// Landing page for speaking & listening practice: a quick mic check plus the
// topics that have oral exercises.
export function OralHub() {
  const { state } = useStore();
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    loadVoices().then(() => setVoiceReady(true));
  }, []);

  const oralTopics = TOPICS.filter((t) =>
    exercisesForTopic(t.id).some((e) => e.type === 'speaking' || e.type === 'listening'),
  );

  return (
    <div className="screen narrow">
      <button className="link back" onClick={() => navigate('/')}>
        ← Dashboard
      </button>
      <h1>🎙 Speaking &amp; listening</h1>
      <p className="muted">
        Hear natural Spanish and speak back — the app listens and checks your
        pronunciation. Works best in Chrome or Edge with microphone access
        allowed.
      </p>

      <div className="card">
        <h3>Quick check</h3>
        <p className="muted small">
          Listening: {speechSupport.tts ? '✓ available' : '✗ not available'} ·
          Speaking (mic): {speechSupport.stt ? '✓ available' : '✗ use Chrome/Edge'}
        </p>
        <button
          className="btn ghost"
          disabled={!voiceReady || !speechSupport.tts}
          onClick={() =>
            speak('¡Hola! Vamos a practicar español juntos.', {
              lang: state.voice.lang,
              rate: state.voice.rate,
            })
          }
        >
          🔊 Test the voice
        </button>
      </div>

      <h2>Pick a topic to practice aloud</h2>
      <div className="topic-grid">
        {oralTopics.map((t) => (
          <button
            key={t.id}
            className="topic-card"
            onClick={() => navigate(`/oral/${t.id}`)}
          >
            <strong>{t.title}</strong>
            <span className="muted small">{t.summary}</span>
            <span className="mastery-chip">
              {state.progress[t.id]?.mastery ?? 50}% mastery
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
