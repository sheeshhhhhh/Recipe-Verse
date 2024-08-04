import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='min-h-screen'>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
