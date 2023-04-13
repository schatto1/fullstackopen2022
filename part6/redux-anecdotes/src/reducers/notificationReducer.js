import { createSlice } from "@reduxjs/toolkit"

const initialState = "this is the initial notification"

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      console.log(state.notification)
      console.log(action.payload)
      return state
    }
  },
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer