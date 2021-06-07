import { useCallback, useMemo, useReducer } from 'react'
import useStateArray from '../useStateArray'

/**
 * useEnhancedReducer
 *
 * Hook that adds an async / thunk functionality to React.useReducer
 *
 * @param {*} reducer
 * @param {*} initialState
 * @param {*} init
 * @returns
 */

export function useReducerThunk(reducer, initialState, init = undefined) {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  let customDispatch = (action) => {
    if (typeof action === 'function') {
      action(customDispatch)
    } else {
      dispatch(action)
    }
  }

  return useMemo(() => [state, customDispatch], [state, customDispatch])
}

/**
 * useEnhancedReducer
 *
 * @param {*} reducers
 * @param {*} initialState
 * @param {*} init
 * @returns
 */

export default function useEnhancedReducer(
  reducers,
  initialState,
  init = undefined
) {
  const rootReducer = useMemo(
    () => combineReducers(reducers),
    [combineReducers, reducers]
  )

  const [state, dispatch] = useReducerThunk(rootReducer, initialState, init)
  const [actions] = useStateArray(Object.keys(rootReducer))

  const combineReducers = useCallback((...reducers) => {
    return function (prevState, value, ...args) {
      return reducers.reduce(
        (newState, reducer) => reducer(newState, value, ...args),
        prevState
      )
    }
  }, [])

  const createReducer = useCallback(
    (actions) => {
      return function reducer(state = initialState, action) {
        if (actions.hasOwnProperty(action.type)) {
          return actions[action.type](state, action)
        } else {
          return state
        }
      }
    },
    [initialState]
  )

  const getActions = useCallback(() => actions, [actions])

  return [
    state,
    dispatch,
    {
      createReducer,
      getActions,
    },
  ]
}
