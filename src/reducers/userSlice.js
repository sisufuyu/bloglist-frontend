import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from "../services/login";
import { setNotification, clearNotification } from './notificationSlice'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const initializeUser = (username, password) => {
  return async (dispatch) => {
    try{
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setNotification(user.name + ' welcome login'));
      dispatch(clearNotification(5000))
    } catch(err) {
      dispatch(setNotification("wrong username or password"));
      dispatch(clearNotification(5000))
    }
  }
}

export default userSlice.reducer
