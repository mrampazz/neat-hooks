### `function useSyncScroll(ref: React.MutableRefObject, axis: String = null) : React.MutableRefObject`

#### Usage

```js
function App() {
  const ref = useRef()
  const targetRef = useSyncScroll(ref)

  return (
    <div>
      <div ref={ref}></div>
      <div ref={targetRef}></div>
    </div>
  )
}
```
