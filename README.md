# neat-hooks

`neat-hooks` is a lightweight package that contains a few hooks that I find very useful to have in my projects. Some of these will be useful throughout your whole project, others are more niche.

- [neat-hooks](#neat-hooks)
    - [State Hooks](#state-hooks)
      - [useStateArray](#usestatearray)
      - [useStateWithDelay](#usestatewithdelay)
      - [useDictionary](#usedictionary)
    - [User Interface Hooks](#user-interface-hooks)
      - [useBoundingClientRect](#useboundingclientrect)
      - [useScroll](#usescroll)
      - [useSyncScroll](#usesyncscroll)

### State Hooks

These hooks are inherent to the state of your component / application. They provide a friendly interface to handle complex state management while keeping their usage simple and clear.

#### useStateArray

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
- `replace(array: Array<Any>?) => Void`
  - _replaces state with array_
- `getLast() => Any`
  - _returns last `item`_
- `getFirst() => Any`
  - _returns first `item`_

#### useStateWithDelay

Custom hook that changes the setState function by adding an optional delay

```js
function useStateWithDelay(initialState: Any? = null) : [state: Any?, setState: Function]
```

Available handlers:

- `setState(value: Any?, delay: Number = 0) => Void`
  - _sets a new state value with an added delay in ms_

#### useDictionary

Custom hook that treats state as a [key, value] map

```js
function useDictionary() => [lastEntry: Any?, dictionary: Object<[Key, Value]>, handlers: Object<Function>]
```

Available handlers:

- `get(key: String) => Any?`
  - _returns `item.value` if it exists in dictionary_
- `set(key: String, value: Any?) => Void`
  - _sets `item` if it doesn't exists in dictionary else it calls `update`_
- `unset(key: String) => Void`
  - _removes `item` with given `key` if it exists_
- `update(key: String, value: Any?) => Void`
  - _updates `item` if it exists with given `key` with given `value`_
- `updateCurrent(key: String) => Void`
  - _updates current pointer to `item` with given `key`_

### User Interface Hooks

Set of hooks to aid in user interface related problems and possible hiccups.

#### useBoundingClientRect

Hook that returns the value of `getBoundingClientRect` on the element that has the ref returned by this function

```js
function useBoundingClientRect() : [boundingClientRect: Object, ref: React.MutableRefObject]
```

#### useScroll

Hook that returns values for scrollLeft and scrollTop of the element with given ref

```js
function useScroll(ref: React.MutableRefObject) : Object<x: Number, y: Number>
```

#### useSyncScroll

Hook that syncs scroll between container and target, uses `useScroll`, returns ref to target element

```js
function useSyncScroll(ref: React.MutableRefObject, axis: String = null) : React.MutableRefObject
```
