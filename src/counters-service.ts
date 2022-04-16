import type { CounterPayloadT } from './model'

const URL = 'http://localhost:3001/counters/'

const getCounters = () => fetch(URL).then((res) => res.json())

const updateCounter = (counter: CounterPayloadT) => {
  return fetch(`http://localhost:3001/counters/${counter.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ count: counter.count }),
    headers: [['Content-Type', 'application/json']],
  })
}

export { getCounters, updateCounter }
