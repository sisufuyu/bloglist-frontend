import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    removeNotification(state){
      return null
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const clearNotification = (sec) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(removeNotification())
    }, sec)
  }
}

export default notificationSlice.reducer