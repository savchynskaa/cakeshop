import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { UserProvider } from './utils/userContext.jsx'
import { SnackbarRegistry } from './components/Snackbar/SnackbarRegistry.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <SnackbarRegistry>
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarRegistry>
  </StrictMode>,
)
