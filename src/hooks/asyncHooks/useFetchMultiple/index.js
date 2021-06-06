import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 *
 * @param {*} promises
 * @param {*} options
 * @param {*} callbacks
 * @returns
 */

export default async function useFetchMultiple(
  promises,
  mode = 'immediate',
  callbacks = {
    onStart: undefined,
    onCompleted: undefined,
    onError: undefined,
  }
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [hasStarted, setHasStarted] = useState(false)

  const isImmediate = useMemo(() => mode === 'immediate', [mode])

  const result = useMemo(
    () => ({
      loading,
      error,
      data,
      hasStarted,
    }),
    [loading, error, data, hasStarted]
  )

  const execute = useCallback(async () => {
    const { onStart, onCompleted, onError } = callbacks

    onStart()
    setHasStarted(true)
    setLoading(true)
    try {
      const res = await Promise.all(promises)
      setData(res)
      setLoading(false)
      onCompleted(res)
    } catch (error) {
      setError(error)
      setLoading(false)
      onError(error)
    }
  }, [promises])

  useEffect(() => {
    if (isImmediate) execute()
  }, [isImmediate])

  return isImmediate ? result : [result, execute]
}
