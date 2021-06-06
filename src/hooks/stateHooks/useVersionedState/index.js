import { useCallback, useEffect, useState } from 'react'
import useDictionary from '../useDictionary'
import useStateArray from '../useStateArray'
import hash from 'object-hash'

export default function useVersionedState(initialValue) {
  const [current, dictionary, { get, set, unset, updateCurrentPointer }] =
    useDictionary()
  const [hashList, { push }] = useStateArray()

  useEffect(() => {
    if (initialValue) {
      setState(initialValue)
    }
  }, [])

  const updateState = useCallback(
    (hash, value) => {
      if (!hashList.includes(hash)) {
        push(hash)
      }
      set(hash, value)
    },
    [push, set, hashList]
  )

  const setState = useCallback(
    (value) => updateState(hash(value), value),
    [updateState]
  )

  const getStateWithHash = useCallback((hash) => get(hash), [get])

  const rollback = useCallback(
    (hash) => {
      updateCurrentPointer(hash)
    },
    [current]
  )

  return { current, hashList, setState, getStateWithHash, rollback }
}
