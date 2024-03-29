# neat-hooks

`neat-hooks` is a lightweight package that contains a few hooks that I find very useful to have in my projects. Some of these will be useful throughout your whole project, others are more niche.

- [State Hooks](#state-hooks)
  - [useStateArray](#usestatearray)
  - [useStateWithDelay](#usestatewithdelay)
  - [useDictionary](#usedictionary)
  - [useVersionedState](#useversionedstate)
- [User Interface Hooks](#user-interface-hooks)
  - [useBoundingClientRect](#useboundingclientrect)
  - [useScroll](#usescroll)
  - [useSyncScroll](#usesyncscroll)

## State Hooks

These hooks are inherent to the state of your component / application. They provide a friendly interface to handle complex state management while keeping their usage simple and clear.

### useStateArray

This simple hook provides an interface to handle the state as an array.

```js
function useStateArray(initialState: Array<Any> | Any) : [state: Array<Any>, handlers: Object<Function>]
```

Available handlers:

- `push(item: Any) => Void`
  - _pushes `item` in state_
- `pop() => Any`
  - _removes last `item` in state and returns it_
- `shift() => Any`
  - _removes first `item` in state and returns it_
- `unshift(value) => Any`
  - _adds `item` at the start of the state_
- `replace(array: Array<Any>?) => Void`
  - _replaces state with array_
- `clear() => Void`
  - _clears array_
- `last() => Any`
  - _returns last `item`_
- `first() => Any`
  - _returns first `item`_

[Go to code](src/useStateArray)

### useStateWithDelay

Custom hook that changes the setState function by adding an optional delay

```js
function useStateWithDelay(initialState: Any? = null) : [state: Any?, setState: Function]
```

Available handlers:

- `setState(value: Any?, delay: Number = 0) => Void`
  - _sets a new state value with an added delay in ms_

[Go to code](src/useStateWithDelay)

### useDictionary

Hook that treats state as a [key, value] map

```js
function useDictionary(initialState: Object = {}) : [dictionary: Object<[Key, Value]>, handlers: Object<Function>]
```

Available handlers:

- `set(key: String, value: Any?) => Void`
  - _sets `item` if it doesn't exists in dictionary else it calls `update`_
- `unset(key: String) => Void`
  - _removes `item` with given `key` if it exists_
- `update(key: String, value: Any?) => Void`
  - _updates `item` if it exists with given `key` with given `value`_
- `get(key: String) => Any?`
  - _returns `item.value` if it exists in dictionary_
- `has(key: String) => Boolean`
  - _returns `true` if key is in dictionary_
- `size() => Number`
  - _returns the size of the dictionary_
- `keys() => Array<String>`
  - _returns the keys of the dictionary_
- `values() => Array<Any>`
  - _returns the values of the dictionary_

[Go to code](src/useDictionary)

### useVersionedState

Hook that creates an history of all state changes saved by hash code

```js
function useVersionedState(initialState: Any) : [currentState: Any, setState: Funcion, handlers: Object<Function>]
```

Available handlers:

- `setState(value: Any?) => Void`
  - _sets a new state_
- `getVersion(hash: String) => Object<hash: String, state: Any>`
  - _returns the state saved with given hash code_
- `getCurrent() => Object<hash: String, state: Any>`
  - _returns current state_
- `rollback(hash: String) => Void`
  - _sets current state to state with given hash_
- `getHashList() => Array<String>`
  - _returns list of all hash codes_

[Go to code](src/useVersionedState)

## User Interface Hooks

Set of hooks to aid in user interface related problems and possible hiccups.

### useBoundingClientRect

Hook that returns the value of `getBoundingClientRect` on the element that has the ref returned by this function

```js
function useBoundingClientRect() : [boundingClientRect: Object, ref: React.MutableRefObject]
```

[Go to code](src/useBoundingClientRect)

### useScroll

Hook that returns values for scrollLeft and scrollTop of the element with given ref

```js
function useScroll(ref: React.MutableRefObject) : Object<x: Number, y: Number>
```

[Go to code](src/useScroll)

### useSyncScroll

Hook that syncs scroll between container and target, uses `useScroll`, returns ref to target element

```js
function useSyncScroll(ref: React.MutableRefObject, axis: String = null) : React.MutableRefObject
```

[Go to code](src/useSyncScroll)
