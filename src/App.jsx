import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import CoinPage from './components/pages/CoinPage' // <-- Asli Import
import './App.css' // Design file


function App() {
  return (
    <div className="app">
      {/* Navbar Header */}
      <nav className="navbar">
        <h1>Crypto Tracker</h1>
      </nav>

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinPage />} />
      </Routes>

      
    </div>
  )
}

export default App