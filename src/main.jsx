import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import TodoApp from './Components/TodoApp.jsx'
import TodoIten from './Components/TodoIten.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TodoApp/>
 

  </StrictMode>,
)
