interface CounterT {
  id: string
  count: number
  title: string
}

type CounterPayloadT = Omit<CounterT, 'title'>

export type { CounterT, CounterPayloadT }
