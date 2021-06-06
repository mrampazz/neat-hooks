import { useCallback, useEffect, useRef } from 'react'

// i think its new?!

/**
 * useSyncScroll
 *
 * Custom hook that syncs scroll between container and target, uses low level
 * hook useScroll
 *
 * @param {*} ref
 * @param {*} axis
 * @returns
 */

const AXIS = {
  X: 'X',
  Y: 'Y',
  XY: 'XY',
}

export default function useSyncScroll(ref, axis = null) {
  const targetRef = useRef()

  const { X, Y, XY } = AXIS

  if (axis === null || (axis !== X && axis !== Y && axis !== XY))
    throw new Error(
      '@useSyncScroll: No valid axis selected. Please see documentation.'
    )

  const { x, y } = useScroll(ref)

  const scrollY = useCallback(() => {
    if (targetRef && targetRef.current) {
      targetRef.current.scroll(0.0, y)
    }
  }, [y, targetRef])

  const scrollX = useCallback(() => {
    if (targetRef && targetRef.current) {
      targetRef.current.scroll(x, 0.0)
    }
  }, [x, targetRef])

  useEffect(() => {
    if (axis === Y) {
      scrollY()
    } else if (axis === X) {
      scrollX()
    } else {
      scrollY()
      scrollX()
    }
  }, [x, y])

  return targetRef
}
