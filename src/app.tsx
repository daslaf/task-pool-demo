import React from 'react'
import { Counter } from './components/counter'
import type { CounterCallbacksT } from './components/counter'
import { Inline, MODE } from './components/inline'
import { List, ListItem } from './components/list'
import { Spinner } from './components/spinner'

import type { CounterT, CounterPayloadT } from './model'
import { makeTaskPool } from './task-pool'
import { getCounters, updateCounter } from './counters-service'

import './app.css'

const TASK_POOL = makeTaskPool()

// Since the task pool state is not tied to React, we can
// trigger tasks from anywhere, and they'll be processed
// as usual. If you uncomment the code below, the blue spinner
// will show for at least 10 seconds
/*
TASK_POOL.run(() => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(12)
    }, 10000)
  })
})
*/

function App() {
  const [counters, setCounters] = React.useState<CounterT[]>([])
  const [loadingCounters, setLoadingCounters] = React.useState(false)

  // ❌ -> Using the request lifecycle
  const [updatingCounterFromRequest, setUpdatingCounterFromRequest] =
    React.useState(false)

  // ✅ -> Using a task pool
  const [updatingCounterFromTaskPool, setUpdatingCounterFromTaskPool] =
    React.useState(() => TASK_POOL.isBusy)

  const handleChange = React.useCallback(
    (counter: CounterPayloadT, cbs: CounterCallbacksT) => {
      // Set to true before an async task is started
      setUpdatingCounterFromTaskPool(true)
      setUpdatingCounterFromRequest(true)

      // This will tell the corresponding counter component
      // that the async operation has started (just for
      // demonstration purposes)
      cbs.onStart()

      TASK_POOL.run(() => updateCounter(counter)).then((res) => {
        if (res.ok) {
          // consolidate state
        } else {
          // retry a couple of times
        }

        // Set to false when request is done (buggy 🐛)
        setUpdatingCounterFromRequest(false)

        // This will tell the corresponding counter component
        // that the async operation has ended (just for
        // demonstration purposes)
        cbs.onEnd()
      })
    },
    []
  )

  React.useEffect(() => {
    // Set to false when the task pool is done processing tasks (good 🥷🏽)
    TASK_POOL.onDone(() => setUpdatingCounterFromTaskPool(false))
  }, [])

  // Get counters from db
  React.useEffect(() => {
    setLoadingCounters(true)
    getCounters().then((data) => {
      setLoadingCounters(false)
      setCounters(data)
    })
  }, [])

  return (
    <div className="app-container">
      <Inline mode={MODE.Spaced}>
        <h1 style={{ marginTop: 16, marginBottom: 16 }}>Counters</h1>
        <Inline mode={MODE.Stacked}>
          {/* Buggy spinner */}
          {updatingCounterFromRequest && (
            <Spinner style={{ border: '2px solid red' }} />
          )}
          {/* Proper spinner */}
          {updatingCounterFromTaskPool && (
            <Spinner style={{ border: '2px solid blue' }} />
          )}
        </Inline>
      </Inline>
      <List>
        {loadingCounters && (
          <ListItem>
            <h2>Loading...</h2>
          </ListItem>
        )}
        {counters.map((counter) => (
          <ListItem key={counter.id}>
            <Counter {...counter} onChange={handleChange} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default App
