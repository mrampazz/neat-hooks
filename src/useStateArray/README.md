### `function useStateArray(initialState: Array<Any> | Any) : [state: Array<Any>, handlers: Object<Function>]`

#### Usage

```js
function App() {
  const [state, handlers] = useStateArray({ a: 1 })
}
```

#### Handlers

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
