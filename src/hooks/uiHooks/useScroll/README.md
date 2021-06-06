### `function useScroll(ref: React.MutableRefObject) : Object<x: Number, y: Number>`

#### Usage

```js
function App() {
  const ref = useRef()
  const scroll = useScroll()

  return <div ref={ref}></div>
}
```
