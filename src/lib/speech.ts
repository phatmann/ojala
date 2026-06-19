// Thin wrappers around the browser Web Speech API: text-to-speech
// (SpeechSynthesis) so the app can speak Spanish, and speech recognition
// (SpeechRecognition) so the learner can speak back. Both are free and run
// entirely on-device in supporting browsers (Chrome/Edge/Safari).

// --- Minimal typings for the parts we use (avoids extra @types deps) --------
interface SpeechRecognitionResultLike {
  0: { transcript: string; confidence: number };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const speechSupport = {
  get tts(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },
  get stt(): boolean {
    return getRecognitionCtor() !== null;
  },
};

// --- Text to speech ---------------------------------------------------------

let cachedVoices: SpeechSynthesisVoice[] = [];

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!speechSupport.tts) return resolve([]);
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      cachedVoices = existing;
      return resolve(existing);
    }
    const handler = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    window.speechSynthesis.onvoiceschanged = handler;
    // Fallback in case the event never fires.
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 500);
  });
}

function pickSpanishVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
  // Prefer an exact language match, then any Spanish voice.
  return (
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith('es')) ??
    undefined
  );
}

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  onend?: () => void;
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  if (!speechSupport.tts) {
    opts.onend?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel(); // stop anything already playing
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts.lang ?? 'es-ES';
  utter.rate = opts.rate ?? 0.95;
  const voice = pickSpanishVoice(utter.lang);
  if (voice) utter.voice = voice;
  if (opts.onend) utter.onend = () => opts.onend!();
  synth.speak(utter);
}

export function stopSpeaking(): void {
  if (speechSupport.tts) window.speechSynthesis.cancel();
}

// --- Speech to text ---------------------------------------------------------

export interface ListenHandle {
  stop: () => void;
}

export interface ListenCallbacks {
  lang?: string;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export function listen(cb: ListenCallbacks): ListenHandle | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) {
    cb.onError?.('not-supported');
    return null;
  }
  const rec = new Ctor();
  rec.lang = cb.lang ?? 'es-ES';
  rec.continuous = false;
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    const last = e.results[e.results.length - 1];
    const transcript = last[0].transcript;
    cb.onResult(transcript, last.isFinal);
  };
  rec.onerror = (e) => cb.onError?.(e.error);
  rec.onend = () => cb.onEnd?.();

  try {
    rec.start();
  } catch {
    // start() throws if called while already running; ignore.
  }
  return { stop: () => rec.stop() };
}
