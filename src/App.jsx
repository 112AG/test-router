import React from 'react'
import Navigation from './components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App