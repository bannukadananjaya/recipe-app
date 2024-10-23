// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import RecipeContexProvider from './context/RecipeContext.jsx'

createRoot(document.getElementById('root')).render(
  <RecipeContexProvider>
      <App />
  </RecipeContexProvider>
  
)
