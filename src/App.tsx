import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="routers">
        <Link to="/eip-712">eip-712</Link>
        <Link to="/eip-3085">eip-3085</Link>
        <Link to="/eip-3326">eip-3326</Link>
      </div>
    </div>
  )
}

export default App
