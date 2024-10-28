import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalRoute from './GlobalRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
// import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='739977074734-he2pn5kq96h86l1atqk7leoopk9eaau6.apps.googleusercontent.com'>
      <AuthProvider>
        <GlobalRoute />
      </AuthProvider>
  </GoogleOAuthProvider>
)
