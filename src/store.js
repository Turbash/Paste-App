import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice.js'

export default configureStore({
  reducer: {
    paste: pasteReducer,
  }
})