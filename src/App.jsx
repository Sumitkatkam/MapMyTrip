import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Hero/>
    </>
  )
}

export default App
