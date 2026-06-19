import { useEffect, useState } from 'react';
import { loadVoices, speak, speechSupport } from '../lib/speech';
import { useStore } from '../state/store';

interface Props {
  text: string;
  label?: string;
  className?: string;
}

// A button that reads Spanish text aloud using the configured voice.
export function SpeakButton({ text, label = 'Listen', className }: Props) {
  const { state } = useStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadVoices().then(() => setReady(true));
  }, []);

  if (!speechSupport.tts) return null;

  return (
    <button
      type="button"
      className={`speak-btn ${className ?? ''}`}
      onClick={() => speak(text, { lang: state.voice.lang, rate: state.voice.rate })}
      disabled={!ready}
      title="Hear it spoken"
      aria-label={`Listen to: ${text}`}
    >
      <span aria-hidden>🔊</span> {label}
    </button>
  );
}
