import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import store from './store.js'
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
  </React.StrictMode>,
)