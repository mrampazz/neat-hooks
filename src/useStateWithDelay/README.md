### `function useStateWithDelay(initialState: Any? = null) : [state: Any?, setState: Function]`

#### Usage

```js
function App() {
  const [state, setState] = useStateWithDelay()
}
```

#### Handlers

- `setState(value: Any?, delay: Number = 0) => Void`
  - _sets a new state value with an added delay in ms_
