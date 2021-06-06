import { useEffect, useState } from 'react'

// made by loads

/**
 * useScroll
 *
 * Custom hook that returns values for scrollLeft and scrollTop
 *
 * @param {*} ref
 * @returns
 */

export function useScroll(ref) {
  const [scroll, setScroll] = useState()

  useEffect(() => {
    if (ref && ref.current) {
      setScroll({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      })
    }
    ref.current.addEventListener('scroll', setScroll)

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('scroll', setScroll)
      }
    }
  }, [ref])

  return scroll
}
