import { PARTY_COLOR } from '../lib/visuals';

/**
 * SVG <pattern> defs used to render "planned" mid-decade redistricting
 * efforts as a striped overlay tinted with each party's color.
 */
export function MapPatterns() {
  return (
    <defs>
      {(['D', 'R'] as const).map((p) => (
        <pattern
          key={p}
          id={`pattern-planned-${p}`}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill="#0a0f1e" />
          <rect width="4" height="8" fill={PARTY_COLOR[p]} opacity="0.85" />
        </pattern>
      ))}
    </defs>
  );
}
