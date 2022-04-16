type Task<T> = () => Promise<T>

interface TaskPool {
  isBusy: boolean
  run<T>(task: Task<T>): Promise<T>
  onDone(cb: () => void): void
}

// Creates a task pool
function makeTaskPool(): TaskPool {
  const pool: Set<symbol> = new Set()

  let clearCb: () => void

  // Called whenever a task is completed
  function onComplete(id: symbol) {
    pool.delete(id)

    if (pool.size === 0 && typeof clearCb === 'function') {
      clearCb()
    }
  }

  // Runs a task
  function run<T>(task: Task<T>) {
    const id = Symbol()
    pool.add(id)

    return task().then(
      (res) => {
        onComplete(id)
        return res
      },
      (e) => {
        onComplete(id)
        return Promise.reject(e)
      }
    )
  }

  // Captures the onDone listener into makeTaskPool scope
  function onDone(cb: () => void) {
    clearCb = cb
  }

  return {
    get isBusy() {
      return pool.size > 0
    },
    run,
    onDone,
  }
}

export { makeTaskPool }
export type { TaskPool, Task }
