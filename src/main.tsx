import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='min-h-screen'>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <QueryClientProvider client={queryClient}>
              <App />
              <Toaster position='top-center' />
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
