import { useCallback, useMemo, useState } from 'react'

/**
 * useStateArray
 *
 * @param {*} initialValue
 * @returns
 */

export default function useStateArray(initialValue) {
  const setInitial = useMemo(() => {
    if (initialValue) {
      if (Array.isArray(initialValue)) {
        return initialValue
      } else {
        return [initialValue]
      }
    } else {
      return []
    }
  }, [initialValue])

  const [state, setState] = useState(setInitial)

  const push = useCallback(
    (value) => setState((prevState) => [...prevState, value]),
    []
  )

  const pop = useCallback(
    () =>
      setState((prevState) => {
        prevState.pop()
        return [...prevState]
      }),
    []
  )

  const shift = useCallback(
    () =>
      setState((prevState) => {
        prevState.shift()
        return [...prevState]
      }),
    []
  )

  const unshift = useCallback(
    () =>
      setState((prevState) => {
        prevState.unshift()
        return [...prevState]
      }),
    []
  )

  const replace = useCallback((value) => {
    if (!value || !Array.isArray(value)) {
      setState([])
      return
    }
    setState(value)
  }, [])

  const clear = useCallback(() => {
    replace(null)
  })

  const last = useCallback(() => state[state.length - 1], [state])

  const first = useCallback(() => state[0], [state])

  return [state, { push, pop, shift, unshift, replace, last, first, clear }]
}
