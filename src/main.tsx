import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SetsProvider } from './context/SetsContext.tsx'
import { NotificationProvider } from './context/NotifContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SetsProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SetsProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
