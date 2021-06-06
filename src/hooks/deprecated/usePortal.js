import { useEffect, useRef } from 'react'
import { addRootElement, createRootElement } from './utils'

// made by alot of ppl...

/**
 *
 * @param {string} id
 * @returns
 */

export default function usePortal(id) {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = document.querySelector(`#${id}`)
    const parent = el || createRootElement(id)
    if (!el) {
      addRootElement(parent)
    }
    parent.appendChild(rootRef.current)

    return () => {
      rootRef.current.remove()
      if (!parent.childElementCount) {
        parent.remove()
      }
    }
  }, [id])

  return () => {
    if (!rootRef.current) {
      rootRef.current = document.createElement('div')
    }
    return rootRef.current
  }
}
