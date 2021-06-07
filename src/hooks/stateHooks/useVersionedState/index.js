import { useCallback, useEffect, useState } from 'react'
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
  const [hashList, { push }] = useStateArray()
  const [current, setCurrent] = useState()

  useEffect(() => {
    if (initialState) {
      setState(initialState)
    }
  }, [])

  const updateState = useCallback(
    (hash, value) => {
      if (!hashList.includes(hash)) {
        push(hash)
      }
      actions.set(hash, value)
      setCurrent(hash)
    },
    [push, actions, hashList]
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
      setCurrent(actions.get(hash))
    },
    [actions]
  )

  const getCurrent = useCallback(
    () => getVersion(current),
    [current, getVersion]
  )

  const getHashList = useCallback(() => hashList, [hashList])

  const handlers = useCallback(
    () => ({ setState, getVersion, getCurrent, rollback, getHashList }),
    [setState, getVersion, getCurrent, rollback, getHashList]
  )

  return [versionedState, handlers]
}
