import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalRoute from './GlobalRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
// import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <AuthProvider>

    <GlobalRoute/>
    </AuthProvider>
  </StrictMode>,
)
