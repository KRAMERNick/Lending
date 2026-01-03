export function DrumKitSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hi-Hat */}
      <g opacity="0.15">
        <ellipse cx="150" cy="200" rx="60" ry="8" fill="#78716c" />
        <line x1="150" y1="200" x2="150" y2="350" stroke="#78716c" strokeWidth="3" />
        <ellipse cx="150" cy="190" rx="60" ry="8" fill="#a8a29e" />
      </g>

      {/* Crash Cymbal */}
      <g opacity="0.15">
        <ellipse cx="250" cy="150" rx="80" ry="10" fill="#78716c" />
        <line x1="250" y1="150" x2="270" y2="350" stroke="#78716c" strokeWidth="3" />
      </g>

      {/* Tom 1 */}
      <g opacity="0.15">
        <ellipse cx="350" cy="220" rx="50" ry="8" fill="#78716c" />
        <rect x="300" y="220" width="100" height="60" fill="#57534e" />
        <ellipse cx="350" cy="280" rx="50" ry="8" fill="#44403c" />
      </g>

      {/* Tom 2 */}
      <g opacity="0.15">
        <ellipse cx="480" cy="240" rx="55" ry="8" fill="#78716c" />
        <rect x="425" y="240" width="110" height="65" fill="#57534e" />
        <ellipse cx="480" cy="305" rx="55" ry="8" fill="#44403c" />
      </g>

      {/* Snare */}
      <g opacity="0.2">
        <ellipse cx="320" cy="380" rx="70" ry="10" fill="#a8a29e" />
        <rect x="250" y="380" width="140" height="80" fill="#78716c" />
        <ellipse cx="320" cy="460" rx="70" ry="10" fill="#57534e" />
        <line x1="250" y1="390" x2="250" y2="450" stroke="#a8a29e" strokeWidth="2" />
        <line x1="390" y1="390" x2="390" y2="450" stroke="#a8a29e" strokeWidth="2" />
      </g>

      {/* Floor Tom */}
      <g opacity="0.15">
        <ellipse cx="550" cy="380" rx="75" ry="10" fill="#78716c" />
        <rect x="475" y="380" width="150" height="100" fill="#57534e" />
        <ellipse cx="550" cy="480" rx="75" ry="10" fill="#44403c" />
        <line x1="475" y1="480" x2="460" y2="550" stroke="#78716c" strokeWidth="4" />
        <line x1="625" y1="480" x2="640" y2="550" stroke="#78716c" strokeWidth="4" />
      </g>

      {/* Bass Drum */}
      <g opacity="0.2">
        <ellipse cx="400" cy="480" rx="120" ry="15" fill="#78716c" />
        <rect x="280" y="380" width="240" height="100" fill="#57534e" />
        <ellipse cx="400" cy="380" rx="120" ry="15" fill="#78716c" />
        <circle cx="400" cy="430" r="35" fill="#a8a29e" />
      </g>

      {/* Ride Cymbal */}
      <g opacity="0.15">
        <ellipse cx="650" cy="200" rx="90" ry="12" fill="#78716c" />
        <line x1="650" y1="200" x2="630" y2="350" stroke="#78716c" strokeWidth="3" />
      </g>

      {/* Drumsticks on snare */}
      <g opacity="0.25">
        <rect x="280" y="365" width="80" height="6" rx="3" fill="#a8a29e" transform="rotate(-15 320 368)" />
        <circle cx="365" cy="358" r="5" fill="#d6d3d1" />
        
        <rect x="330" y="370" width="80" height="6" rx="3" fill="#a8a29e" transform="rotate(20 370 373)" />
        <circle cx="415" cy="382" r="5" fill="#d6d3d1" />
      </g>
    </svg>
  );
}
