import React from 'react'

/**
 * Water/waves icon — 1:1 from reference: four parallel horizontal wavy lines,
 * sine-like, three full cycles, in phase, even spacing, rounded ends.
 */
export default function TarotWavesIcon({ className, ...props }) {
  // One sine-like wave path (3 cycles over 0–64); midY = vertical center of the line
  const wavePath = (midY) => {
    const a = 3.5 // amplitude
    return `M 0 ${midY} Q 5.3 ${midY - a} 10.7 ${midY - a} Q 16 ${midY - a} 21.3 ${midY} Q 26.7 ${midY + a} 32 ${midY + a} Q 37.3 ${midY + a} 42.7 ${midY} Q 48 ${midY - a} 53.3 ${midY - a} Q 58.7 ${midY - a} 64 ${midY}`
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d={wavePath(5)} />
      <path d={wavePath(11)} />
      <path d={wavePath(17)} />
      <path d={wavePath(23)} />
    </svg>
  )
}
