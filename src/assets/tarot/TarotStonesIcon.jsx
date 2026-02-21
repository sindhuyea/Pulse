import React from 'react'

/**
 * Stones/cairn icon — 1:1 from reference: three stacked ovals (outline only),
 * top stone with curved highlight line; two concentric radiating curves on each side of base.
 */
export default function TarotStonesIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Bottom stone — largest oval */}
      <ellipse cx="32" cy="36" rx="22" ry="7" />
      {/* Middle stone */}
      <ellipse cx="32" cy="26" rx="16" ry="5.5" />
      {/* Top stone — smallest; curved highlight on top */}
      <ellipse cx="32" cy="18" rx="11" ry="4" />
      <path d="M 26 15 Q 32 13 38 15" />
      {/* Left: two concentric curved lines arching up and out */}
      <path d="M 12 40 Q 4 32 6 24" />
      <path d="M 14 39 Q 6 30 8 24" />
      {/* Right: two concentric curved lines arching up and out */}
      <path d="M 52 40 Q 60 32 58 24" />
      <path d="M 50 39 Q 58 30 56 24" />
    </svg>
  )
}
