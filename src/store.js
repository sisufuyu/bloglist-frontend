import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogReducer from "./reducers/blogSlice";
import userReducer from "./reducers/userSlice";
import usersReducer from "./reducers/usersSlice";
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = combineReducers({
  notification: notificationReducer,
  blog: blogReducer,
  user: userReducer,
  users: usersReducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer
})