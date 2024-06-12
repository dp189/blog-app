import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { FavouriteBlogProvider } from './context/FavContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavouriteBlogProvider>
        <App />
      </FavouriteBlogProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
