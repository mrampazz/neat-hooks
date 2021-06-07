import { useCallback, useState } from 'react'

/**
 * useStateArray
 *
 * @param {*} initialValue
 * @returns
 */

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

  const unshift = useCallback(
    (value) => {
      const copy = state
      const item = copy.unshift(value)
      setState(copy)
      return item
    },
    [state]
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

  const handlers = useCallback(
    () => ({ push, pop, shift, unshift, replace, last, first, clear }),
    [push, pop, shift, unshift, replace, last, first, clear]
  )

  return [state, handlers]
}
