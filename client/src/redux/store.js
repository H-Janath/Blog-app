import { configureStore } from '@reduxjs/toolkit'
import  useReducer  from './User/UserSlice'
export const store = configureStore({
  reducer: {
    user: useReducer,
  },
}) 