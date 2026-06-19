import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { AppState, Level, TopicProgress } from '../types';
import { generatePlan } from './plan';
import { applyAnswer, type PlacementResult, seedProgress } from './scoring';

const STORAGE_KEY = 'ojala.state.v1';
const STATE_VERSION = 1;

const initialState: AppState = {
  version: STATE_VERSION,
  onboarded: false,
  daysPerWeek: 5,
  placementDone: false,
  progress: {},
  completedSessions: [],
  streak: { count: 0 },
  voice: { lang: 'es-ES', rate: 0.95 },
};

type Action =
  | { type: 'load'; state: AppState }
  | { type: 'setGoal'; name?: string; goalLevel: Level; weeks: number; daysPerWeek: number }
  | { type: 'completePlacement'; result: PlacementResult }
  | { type: 'buildPlan' }
  | { type: 'recordAnswer'; topic: string; correct: boolean }
  | { type: 'markLessonRead'; topic: string }
  | { type: 'completeSession'; sessionId: string }
  | { type: 'studiedToday' }
  | { type: 'setVoice'; lang?: string; rate?: number }
  | { type: 'reset' };

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'load':
      return action.state;

    case 'setGoal':
      return {
        ...state,
        learnerName: action.name,
        goalLevel: action.goalLevel,
        weeks: action.weeks,
        daysPerWeek: action.daysPerWeek,
        onboarded: true,
      };

    case 'completePlacement': {
      const progress = seedProgress(action.result);
      return {
        ...state,
        placementDone: true,
        estimatedLevel: action.result.estimatedLevel,
        startLevel: action.result.estimatedLevel,
        progress,
      };
    }

    case 'buildPlan': {
      if (!state.goalLevel || !state.weeks) return state;
      const plan = generatePlan({
        goalLevel: state.goalLevel,
        startLevel: state.startLevel ?? state.estimatedLevel ?? 'intermediate-mid',
        weeks: state.weeks,
        daysPerWeek: state.daysPerWeek,
        progress: state.progress,
      });
      return { ...state, plan };
    }

    case 'recordAnswer': {
      const prev: TopicProgress =
        state.progress[action.topic] ??
        { mastery: 50, attempts: 0, correct: 0, lessonRead: false };
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.topic]: applyAnswer(prev, action.correct),
        },
      };
    }

    case 'markLessonRead': {
      const prev: TopicProgress =
        state.progress[action.topic] ??
        { mastery: 50, attempts: 0, correct: 0, lessonRead: false };
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.topic]: { ...prev, lessonRead: true },
        },
      };
    }

    case 'completeSession': {
      if (state.completedSessions.includes(action.sessionId)) return state;
      return {
        ...state,
        completedSessions: [...state.completedSessions, action.sessionId],
      };
    }

    case 'studiedToday': {
      const today = todayStr();
      if (state.streak.lastStudyDate === today) return state;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const count =
        state.streak.lastStudyDate === yesterday ? state.streak.count + 1 : 1;
      return { ...state, streak: { count, lastStudyDate: today } };
    }

    case 'setVoice':
      return {
        ...state,
        voice: {
          lang: action.lang ?? state.voice.lang,
          rate: action.rate ?? state.voice.rate,
        },
      };

    case 'reset':
      return { ...initialState };

    default:
      return state;
  }
}

interface StoreContextValue {
  state: AppState;
  setGoal: (name: string | undefined, goalLevel: Level, weeks: number, daysPerWeek: number) => void;
  completePlacement: (result: PlacementResult) => void;
  buildPlan: () => void;
  recordAnswer: (topic: string, correct: boolean) => void;
  markLessonRead: (topic: string) => void;
  completeSession: (sessionId: string) => void;
  setVoice: (lang?: string, rate?: number) => void;
  reset: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function loadInitial(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== STATE_VERSION) return initialState;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable (private mode); the app still works in-memory.
    }
  }, [state]);

  const setGoal = useCallback(
    (name: string | undefined, goalLevel: Level, weeks: number, daysPerWeek: number) =>
      dispatch({ type: 'setGoal', name, goalLevel, weeks, daysPerWeek }),
    [],
  );
  const completePlacement = useCallback(
    (result: PlacementResult) => dispatch({ type: 'completePlacement', result }),
    [],
  );
  const buildPlan = useCallback(() => dispatch({ type: 'buildPlan' }), []);
  const recordAnswer = useCallback((topic: string, correct: boolean) => {
    dispatch({ type: 'recordAnswer', topic, correct });
    dispatch({ type: 'studiedToday' });
  }, []);
  const markLessonRead = useCallback(
    (topic: string) => dispatch({ type: 'markLessonRead', topic }),
    [],
  );
  const completeSession = useCallback(
    (sessionId: string) => dispatch({ type: 'completeSession', sessionId }),
    [],
  );
  const setVoice = useCallback(
    (lang?: string, rate?: number) => dispatch({ type: 'setVoice', lang, rate }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: 'reset' }), []);

  const value = useMemo<StoreContextValue>(
    () => ({
      state,
      setGoal,
      completePlacement,
      buildPlan,
      recordAnswer,
      markLessonRead,
      completeSession,
      setVoice,
      reset,
    }),
    [state, setGoal, completePlacement, buildPlan, recordAnswer, markLessonRead, completeSession, setVoice, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within a StoreProvider');
  return ctx;
}
