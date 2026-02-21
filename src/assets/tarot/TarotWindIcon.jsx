import React from 'react'

/**
 * Wind icon — 1:1 from reference: three wavy wind lines (top longest, middle shorter, bottom shortest);
 * three solid leaves with thin curved vein cutout revealing background.
 */
export default function TarotWindIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 52"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top wind line — longest, curves gently down in middle */}
      <path d="M 2 10 C 14 10 22 14 32 12 C 42 10 50 14 64 12" />
      {/* Middle wind line — slightly shorter, curves down in middle */}
      <path d="M 6 22 C 18 22 26 26 34 24 C 42 22 52 26 62 24" />
      {/* Bottom wind line — shortest, curves slightly up in middle */}
      <path d="M 10 34 C 20 34 28 30 36 32 C 44 34 52 30 60 32" />

      {/* Top right leaf — stem toward wind lines, tip down-right; vein base to tip */}
      <path
        d="M 46 10 Q 52 8 58 14 Q 60 20 56 24 Q 50 26 46 22 Q 44 16 46 10 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 46 14 Q 52 18 52 22"
        fill="none"
        stroke="var(--tarot-vein, #E8E4E8)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Bottom left leaf — stem left-up, tip down-right */}
      <path
        d="M 12 40 Q 6 44 8 50 Q 14 54 20 50 Q 24 46 20 40 Q 14 38 12 40 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 12 44 Q 16 50 18 48"
        fill="none"
        stroke="var(--tarot-vein, #E8E4E8)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Bottom right leaf — stem right-up, tip down-left */}
      <path
        d="M 54 42 Q 60 40 62 46 Q 60 52 54 54 Q 48 52 46 46 Q 48 42 54 42 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 54 46 Q 50 52 48 50"
        fill="none"
        stroke="var(--tarot-vein, #E8E4E8)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  )
}
