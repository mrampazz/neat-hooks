import { useCallback, useEffect, useMemo, useState } from 'react'
import useStateArray from '../useStateArray/useStateArray'

/**
 * useDictionary
 *
 * Hook that handles a simple useState as a [key, value] map
 *
 * @returns
 */

export default function useDictionary() {
  const [dictionary, setDictionary] = useState({})

  const has = useCallback(
    (key) => Object.keys(dictionary).includes(key),
    [dictionary]
  )

  const get = useCallback(
    (key) => {
      if (!key || !has(key)) return
      if (Array.isArray(key)) {
        return key.map((it) => dictionary[it])
      }
      return dictionary[key]
    },
    [dictionary, has]
  )

  const set = useCallback(
    (key, value) => {
      if (has(key)) {
        update(key, value)
        return
      }
      setDictionary({ ...dictionary, [key]: value })
    },
    [dictionary, update, has]
  )

  const unset = useCallback(
    (key) => {
      if (!has(key)) return
      const newObj = { ...dictionary }
      if (!delete newObj[key]) return
      delete newObj[key]
      setDictionary(newObj)
    },
    [dictionary, has]
  )

  const update = useCallback(
    (key, value) => setDictionary({ ...dictionary, [key]: value }),
    [dictionary]
  )

  const size = useCallback(() => Object.keys(dictionary).length, [dictionary])

  return [dictionary, { set, unset, update, get, has, size }]
}
