import { useCallback, useMemo, useState } from 'react'

export default function useStateArray(initialValue) {
  const setInitial = useCallback(() => {
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

  const [state, setState] = useState(setInitial(initialValue))

  const push = useCallback(
    (value) => {
      const copy = state
      copy.push(value)
      setState(copy)
    },
    [state]
  )

  const pop = useCallback(() => {
    const copy = state
    const item = copy.pop()
    setState(copy)
    return item
  }, [state])

  const shift = useCallback(() => {
    const copy = state
    const item = copy.shift()
    setState(copy)
    return item
  }, [state])

  const replace = useCallback((value) => {
    if (value === undefined || !Array.isArray(value)) {
      setState(null)
      return
    }
    setState(value)
  }, [])

  const getLast = useCallback(() => state[state.length - 1], [state])

  const getFirst = useCallback(() => state[0], [state])

  return [state, { push, pop, shift, getLast, replace, getFirst }]
}
