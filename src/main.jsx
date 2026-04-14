import React from 'react'
import ReactDOM from 'react-dom/client'
import { inject } from '@vercel/analytics'
import HiveDoctrine from './App.jsx'

inject()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HiveDoctrine />
  </React.StrictMode>,
)
