import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import MainRoutes from './routes/MainRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <MainRoutes/>
     </Router>
    </>
  )
}

export default App
