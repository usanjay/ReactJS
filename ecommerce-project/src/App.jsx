// import { useState } from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<div>Working</div>} />
      </Routes>
    </>
  )
}

export default App
