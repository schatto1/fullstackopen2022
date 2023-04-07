const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload)
  }

  return state
}

// eslint-disable-next-line import/no-anonymous-default-export
export default noteReducer