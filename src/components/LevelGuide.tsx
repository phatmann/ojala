import { LEVELS, LEVEL_LABELS, LEVEL_COURSE, type Level } from '../types';

interface Props {
  /** Optionally highlight one level row (e.g. the current selection). */
  highlight?: Level;
}

// A collapsible "which level matches my class?" reference. Maps each
// proficiency level to a typical school course so the goal picker is clear.
export function LevelGuide({ highlight }: Props) {
  // Show from Novice High up — that's the realistic range for these courses.
  const rows = LEVELS.filter((l) => l !== 'novice-low' && l !== 'novice-mid');

  return (
    <details className="level-guide">
      <summary>Which level matches my class?</summary>
      <table className="conj-table">
        <thead>
          <tr>
            <th>Proficiency level (AAPL/ACTFL)</th>
            <th>≈ School class</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l} className={l === highlight ? 'highlight' : ''}>
              <td className="rowhead">{LEVEL_LABELS[l]}</td>
              <td>{LEVEL_COURSE[l]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted small">
        These are approximate — exact placement varies by school. (Calibrated so
        that AAPL Intermediate 2–3 lands you in Spanish 4.)
      </p>
    </details>
  );
}
