import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useBoundingClientRect
 *
 * @returns returns result of getBoundingClientRect called on the element's ref
 */

export default function useBoundingClientRect() {
  const ref = useRef()
  const [boundingClientRect, setBoundingClientRect] = useState(null)

  const set = useCallback(
    () =>
      setBoundingClientRect(
        ref && ref.current ? ref.current.getBoundingClientRect() : {}
      ),
    [ref]
  )

  useEffect(() => {
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])

  return [boundingClientRect, ref]
}
