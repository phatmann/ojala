// Utilities for comparing learner input (typed or spoken) against accepted
// answers, tolerant of accents, punctuation, and case.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents/diacritics
    .replace(/[¿?¡!.,;:"'()]/g, ' ') // strip punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

/** Exact (accent/case/punctuation-insensitive) match against accepted answers. */
export function matchesAny(input: string, accepted: string[]): boolean {
  const n = normalize(input);
  return accepted.some((a) => normalize(a) === n);
}

/** Levenshtein edit distance. */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const prev = new Array(n + 1);
  const curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return prev[n];
}

/** 0–1 similarity based on normalized edit distance. */
export function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na && !nb) return 1;
  const dist = editDistance(na, nb);
  const maxLen = Math.max(na.length, nb.length) || 1;
  return 1 - dist / maxLen;
}

/**
 * Judge a spoken/typed sentence against a target. Speech recognition is fuzzy,
 * so we accept close matches. Returns similarity and a pass/fail.
 */
export function judgeSpoken(
  spoken: string,
  target: string,
  threshold = 0.8,
): { score: number; pass: boolean } {
  const best = Math.max(
    similarity(spoken, target),
    // also compare word-set overlap to be forgiving about small filler words
    wordOverlap(spoken, target),
  );
  return { score: best, pass: best >= threshold };
}

function wordOverlap(a: string, b: string): number {
  const wa = normalize(a).split(' ').filter(Boolean);
  const wb = normalize(b).split(' ').filter(Boolean);
  if (wb.length === 0) return 0;
  const setA = new Set(wa);
  let hit = 0;
  for (const w of wb) if (setA.has(w)) hit++;
  return hit / wb.length;
}
