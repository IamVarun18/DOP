export default function LensLogo({ size = 40, spin = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={spin ? { animation: "spinLens 12s linear infinite" } : {}}
    >
      <style>{`
        @keyframes spinLens {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <circle cx="50" cy="50" r="50" fill="#0a0a0a"/>
      <circle cx="50" cy="50" r="44" fill="none" stroke="#b48c50" strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="34" fill="none" stroke="#b48c50" strokeWidth="1"/>
      <circle cx="50" cy="50" r="24" fill="none" stroke="#b48c50" strokeWidth="0.8"/>

      <g transform="translate(50,50)">
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(0)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(60)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(120)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(180)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(240)"/>
        <ellipse cx="0" cy="-14" rx="6" ry="13" fill="#b48c50" opacity="0.35" transform="rotate(300)"/>
      </g>

      <circle cx="50" cy="50" r="4" fill="#b48c50"/>

      <g transform="translate(50,50)" stroke="#b48c50" strokeWidth="1.2">
        <line x1="0" y1="-44" x2="0" y2="-38"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(45)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(90)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(135)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(180)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(225)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(270)"/>
        <line x1="0" y1="-44" x2="0" y2="-38" transform="rotate(315)"/>
      </g>
    </svg>
  );
}