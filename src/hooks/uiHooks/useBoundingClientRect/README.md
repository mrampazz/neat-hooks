### `function useBoundingClientRect() : [boundingClientRect: Object, ref: React.MutableRefObject]`

#### Usage

```js
function App() {
  const [boundingClientRect, ref] = useBoundingClientRect()

  return <div ref={ref}></div>
}
```
