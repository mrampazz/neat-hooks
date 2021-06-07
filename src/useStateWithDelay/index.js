import { useCallback, useRef, useState } from 'react'

/**
 * useStateWithDelay
 *
 * Hook that changes the state with an optional delay
 *
 * @param {*} initialState - initial value for state [default: null]
 * @returns state & setStateWithDelay
 */

export default function useStateWithDelay(initialState = null) {
  const [state, setState] = useState(initialState)
  const timeoutRef = useRef()

  const handleChangeState = useCallback(
    (value, delay = 0) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setState(value), delay)
    },
    [timeoutRef]
  )

  return [state, handleChangeState]
}
