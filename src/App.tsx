import { useRoute, navigate } from './lib/router';
import { useStore } from './state/store';
import { Onboarding } from './components/Onboarding';
import { Placement } from './components/Placement';
import { Dashboard } from './components/Dashboard';
import { PlanView } from './components/PlanView';
import { LessonView } from './components/LessonView';
import { Practice } from './components/Practice';
import { OralHub } from './components/OralHub';
import { Library } from './components/Library';
import { Settings } from './components/Settings';

export function App() {
  const route = useRoute();
  const { state } = useStore();
  const top = route.segments[0] ?? '';

  // Gate: until the learner has set a goal, route everything to onboarding.
  if (!state.onboarded && top !== 'onboarding') {
    return <Onboarding />;
  }
  // After onboarding but before placement, push them through the test.
  if (state.onboarded && !state.placementDone && top !== 'placement' && top !== 'settings') {
    return <Placement />;
  }

  return (
    <div className="app">
      <TopBar />
      <main>{renderRoute(top, route.segments)}</main>
      <footer className="app-footer">
        <span>Ojalá · guided Spanish practice</span>
        <span className="muted small">
          Your progress is saved on this device. · Build {__BUILD_TIME__}
        </span>
      </footer>
    </div>
  );
}

function renderRoute(top: string, segments: string[]) {
  switch (top) {
    case '':
      return <Dashboard />;
    case 'onboarding':
      return <Onboarding />;
    case 'placement':
      return <Placement />;
    case 'plan':
      return <PlanView />;
    case 'lesson':
      return <LessonView />;
    case 'practice':
      return <Practice mode="all" />;
    case 'oral':
      return segments[1] ? <Practice mode="oral" /> : <OralHub />;
    case 'library':
      return <Library />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard />;
  }
}

function TopBar() {
  const route = useRoute();
  const top = route.segments[0] ?? '';
  const item = (key: string, label: string, icon: string) => (
    <button
      className={`nav-item ${top === key ? 'active' : ''}`}
      onClick={() => navigate(key === '' ? '/' : `/${key}`)}
    >
      <span className="nav-icon" aria-hidden>{icon}</span>
      <span className="nav-label">{label}</span>
    </button>
  );

  return (
    <header className="topbar">
      <button className="logo" onClick={() => navigate('/')}>
        Ojalá
      </button>
      <nav className="nav">
        {item('', 'Home', '🏠')}
        {item('plan', 'Plan', '🗓')}
        {item('library', 'Library', '📚')}
        {item('oral', 'Speak', '🎙')}
        {item('settings', 'Settings', '⚙️')}
      </nav>
    </header>
  );
}
