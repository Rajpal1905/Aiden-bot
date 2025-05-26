import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Toaster } from 'react-hot-toast'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

const theme = createTheme({
  typography: {
    fontFamily: "Roboto slab, serif",
    allVariants: { color: "white" }
  },
});


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
)
