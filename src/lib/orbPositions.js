/**
 * Orb positions for the body outline. Stored in localStorage so you can
 * calibrate by clicking (use ?calibrate=1). Each value is { x, y } in 0–100.
 */
const STORAGE_KEY = 'pulse-orb-positions'

export const CALIBRATION_PARTS = [
  { key: 'head', label: 'head' },
  { key: 'shoulders', label: 'shoulders' },
  { key: 'chest', label: 'chest' },
  { key: 'lowerBack', label: 'lower back' },
  { key: 'hands', label: 'hands' },
  { key: 'legs', label: 'legs' },
]

export function getStoredPositions() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    const keys = CALIBRATION_PARTS.map((p) => p.key)
    if (keys.every((k) => data[k] && typeof data[k].x === 'number' && typeof data[k].y === 'number')) {
      return data
    }
  } catch (_) {}
  return null
}

export function savePositions(positions) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
}

export function clearPositions() {
  window.localStorage.removeItem(STORAGE_KEY)
}
