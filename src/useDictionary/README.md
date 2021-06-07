### `function useDictionary(initialState: Object = {}) : [dictionary: Object<[Key, Value]>, handlers: Object<Function>]`

#### Usage

```js
function App() {
  const [dictionary, handlers] = useDictionary()
}
```

#### Handlers

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
