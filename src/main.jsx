// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- 1. IMPORT IT
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* <-- 2. WRAP YOUR APP */}
      <App />
    </BrowserRouter> {/* <-- 3. CLOSE THE WRAPPER */}
  </React.StrictMode>,
)