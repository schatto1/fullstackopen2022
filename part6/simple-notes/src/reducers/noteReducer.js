const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.payload)
    return state
  }

  return state
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { noteReducer }