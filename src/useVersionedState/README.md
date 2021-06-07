### `function useVersionedState(initialState: Any) : [currentState: Any, setState: Funcion, handlers: Object<Function>]`

#### Usage

```js
function App() {
  const [state, setState, handlers] = useVersionedState({ a: 1 })
}
```

#### Handlers

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
