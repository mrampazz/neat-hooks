import { useCallback, useEffect, useMemo, useState } from 'react'
import useStateArray from '../useStateArray/useStateArray'

/**
 * useDictionary
 *
 * custom hook that treats state as a [key, value] map
 * methods:
 *  - get
 *  - set
 *  - update
 *  - unset
 *  - getDictionary
 *
 * @returns
 */

export default function useDictionary() {
  const [dictionary, setDictionary] = useState({})
  const [lastEntry, setLastEntry] = useState(null)
  const [keys, { last, setState }] = useStateArray([])

  useEffect(() => {
    setState(Object.keys(dictionary))
  }, [dictionary])

  const isKeyInDictionary = useCallback(
    (key) => Object.keys(dictionary).includes(key),
    [dictionary]
  )

  const get = useCallback(
    (key) => {
      if (!key || !isKeyInDictionary(key)) return
      if (Array.isArray(key)) {
        return key.map((it) => dictionary[it])
      }
      return dictionary[key]
    },
    [dictionary, isKeyInDictionary]
  )

  const set = useCallback(
    (key, value) => {
      if (isKeyInDictionary(key)) {
        update(key, value)
        updateCurrent(key)
        return
      }
      setDictionary({ ...dictionary, [key]: value })
      setLastEntry({ key: key, value: value })
    },
    [dictionary, update, updateCurrent, isKeyInDictionary]
  )

  const updateCurrent = useCallback(
    (key) => {
      if (!isKeyInDictionary(key)) return
      setLastEntry({ key: key, value: get(key) })
    },
    [get, isKeyInDictionary]
  )

  const unset = useCallback(
    (key) => {
      if (!isKeyInDictionary(key)) return
      const newObj = { ...dictionary }
      if (!delete newObj[key]) return
      delete newObj[key]
      setDictionary(newObj)
      if (key === lastEntry.key) {
        updateCurrent(last)
      }
    },
    [dictionary, last, isKeyInDictionary, updateCurrent]
  )

  const update = useCallback(
    (key, value) => setDictionary({ ...dictionary, [key]: value }),
    [dictionary]
  )

  return [lastEntry, dictionary, { get, set, unset, update, updateCurrent }]
}
