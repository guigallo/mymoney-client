import mitt from 'mitt'

const createStore = (initialState, reducer) => {
  // a new event emitter instance
  const emitter = mitt()
  let state = initialState
  return {
    getState: () => state,
    subscribe: cb => {
      // subscribe to "update" event
      emitter.on('update', cb)
      return () => emitter.off('update', cb)
    },
    dispatch: action => {
      state = reducer(state, action)
      // trigger an "update" event
      emitter.emit('update', state)
    }
  }
}

export default createStore