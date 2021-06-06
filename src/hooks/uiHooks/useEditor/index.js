import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'

const ALLOWED_KEYS = {
  TAB: 'TAB',
  CTRL_D: 'CTRL+D',
}

// const SELECTION_LIMITS = [' ', '"', "'"]

const SELECTION_LIMITS = {
  '\t': { start: '\t', end: '\t' },
  ' ': { start: ' ', end: ' ' },
  '"': { start: '"', end: '"' },
  "'": { start: "'", end: "'" },
}

const SELECTION_PARENTHESES = {
  '{': { start: '{', end: '}' },
  '(': { start: '(', end: ')' },
  '[': { start: '[', end: ']' },
}

const LIMITERS = {
  ...SELECTION_LIMITS,
  ...SELECTION_PARENTHESES,
}

function handleKeyCombination(e) {
  const key =
    e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt'
      ? ''
      : e.key.toUpperCase()
  const ctrl = e.ctrlKey ? 'CTRL_' : ''
  const shift = e.shiftKey ? 'SHIFT_' : ''
  const alt = e.altKey ? 'ALT_' : ''
  return `${ctrl}${shift}${alt}${key}`
}

function setSelection(element, begin, end) {
  if (end === undefined) {
    element.selectionStart = begin
    element.selectionEnd = begin
    return
  }
  element.selectionStart = begin
  element.selectionEnd = end
}

function indent(value, start, end) {
  console.log(start, end)
  return value.substring(0, start) + '\t' + value.substring(end)
}

function identifyLimiter(value, caretPos) {
  let limiter = ''
  let c = caretPos

  while (c >= 0) {
    const l = LIMITERS[value.charAt(c)]
    if (l) {
      limiter = l
      break
    }
    c--
  }

  return limiter
}

function findWord(value, caretPos) {
  let start = 0
  let end = 0
  let c = caretPos

  const limiter = identifyLimiter(value, caretPos)

  while (c >= 0) {
    if (value.charAt(c) === limiter.start) {
      start = c
      break
    }
    start = -1
    c--
  }

  c = caretPos
  while (c <= value.length) {
    if (value.charAt(c) === limiter.end) {
      end = c
      break
    }
    end = value.length
    c++
  }

  if (end - start > 0)
    return {
      start,
      end,
    }

  return null
}

function FUNCTIONS(event, element) {
  const { selectionStart, selectionEnd } = event.target
  return {
    TAB: () => {
      event.preventDefault()
      const start = element.selectionStart
      const end = element.selectionEnd
      const res = indent(element.value, start, end)
      element.selectionStart = element.selectionEnd = start + 1
      return res
    },
    CTRL_D: () => {
      event.preventDefault()
      const caretPos = getCaretPosition(element)
      const value = element.value
      const word = findWord(value, caretPos)
      if (word) setSelection(element, word.start + 1, word.end)
      return value
    },
  }
}

function getCaretPosition(element) {
  if (element.selectionStart) {
    return element.selectionStart
  }
  return 0
}

export default function useEditor(ref) {
  const [text, setText] = useState('')

  const keyFunctions = useCallback(
    (e) => FUNCTIONS(e, ref.current),
    [text, ref]
  )

  const handleChange = useCallback((e) => {
    setText(e.target.value)
  }, [])

  // const handleSelectWord = useCallback((e) => {}, [])

  useEffect(() => console.log('text', text), [text])

  const handleOnkeydown = useCallback(
    (e) => {
      const handlers = keyFunctions(e)
      const keyPress = handleKeyCombination(e)
      const res = handlers[keyPress]
      if (res) {
        setText(res)
      }
    },
    [keyFunctions]
  )

  useEffect(() => {
    const element = ref.current

    if (element) {
      element.addEventListener('keydown', handleOnkeydown)
    }
    return () => {
      element.removeEventListener('keydown', handleOnkeydown)
    }
  }, [ref])

  return [
    {
      value: text,
    },
    handleChange,
  ]
}
