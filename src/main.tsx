import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppEntriesContextProvider from './context/AppEntriesContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AppEntriesContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AppEntriesContextProvider>
)
