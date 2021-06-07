import { useCallback, useEffect, useMemo, useState } from 'react'
import useDictionary from '../useDictionary'
import useStateArray from '../useStateArray'
import hash from 'object-hash'

/**
 *
 * @param {} initialValue
 * @returns
 */

export default function useVersionedState(initialState) {
  const [versionedState, actions] = useDictionary()
  const [hashList, hashListHandlers] = useStateArray()
  const [current, setCurrent] = useState()

  useEffect(() => {
    if (initialState) {
      setState(initialState)
    }
  }, [setState])

  const updateState = useCallback(
    (hash, value) => {
      if (!hashList.includes(hash)) {
        hashListHandlers.push(hash)
      }
      actions.set(hash, value)
      setCurrent(hash)
    },
    [hashListHandlers, actions, hashList]
  )

  const setState = useCallback(
    (value) => updateState(hash(value), value),
    [updateState]
  )

  const getVersion = useCallback(
    (hash) => ({ hash: hash, state: actions.get(hash) }),
    [actions]
  )

  const rollback = useCallback(
    (hash) => {
      setCurrent(hash)
    },
    [actions]
  )

  const getCurrent = useCallback(
    () => getVersion(current),
    [current, getVersion]
  )

  const getHistory = useCallback(() => versionedState, [versionedState])
  const getHashlist = useCallback(() => hashList, [hashList])

  return [
    useMemo(() => getCurrent(), [getCurrent]),
    setState,
    {
      getHistory,
      getHashlist,
      getVersion,
      getCurrent,
      rollback,
    },
  ]
}
