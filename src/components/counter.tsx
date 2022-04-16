import React from 'react'
import debounce from 'lodash.debounce'
import { Button } from './button'
import { Inline, MODE } from './inline'
import { Spinner } from './spinner'
import type { CounterT, CounterPayloadT } from '../model'

import './counter.css'

type CounterCallbacksT = { onStart(): void; onEnd(): void }
type CounterProps = CounterT & {
  onChange(
    counter: CounterPayloadT,
    // This is only for getting talking back to the component
    // when the task has started being processed and when it
    // has ended
    cbs: CounterCallbacksT
  ): void
}

const Counter = ({ count, id, title, onChange }: CounterProps) => {
  const [value, setValue] = React.useState(() => count)
  const isFirstRender = React.useRef(true)

  // We're keeping track of the request status down here as well just for
  // demonstration purposes
  const [loading, setLoading] = React.useState(false)

  const handleDecrementClick = React.useCallback(() => {
    setValue((v) => v - 1)
  }, [])

  const handleIncrementClick = React.useCallback(() => {
    setValue((v) => v + 1)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = React.useCallback(debounce(onChange, 500), [onChange])

  React.useEffect(() => {
    if (!isFirstRender.current) {
      const onStart = () => setLoading(true)
      const onEnd = () => setLoading(false)
      debouncedChange({ id, count: value }, { onStart, onEnd })
    }

    return () => {
      debouncedChange.cancel()
      isFirstRender.current = false
    }
  }, [id, value, debouncedChange])

  return (
    <Inline className="ui-counter" mode={MODE.Spaced}>
      <h2 className="ui-counter-title">{title}</h2>
      <Inline mode={MODE.Stacked}>
        {loading && <Spinner />}
        <Button onClick={handleDecrementClick}>dec</Button>
        <span className="ui-counter-count">{value}</span>
        <Button onClick={handleIncrementClick}>inc</Button>
      </Inline>
    </Inline>
  )
}

export { Counter }
export type { CounterCallbacksT }
