import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Navbar from './Components/Navbar/Navbar'
import AboutUs from "./Pages/AboutUs"
import Favorite from "./Pages/Favorite"
import LogIn from "./Pages/LogIn"
import Cart from "./Pages/Cart"
import Footer from './Components/Footer'
import Signup from './Components/Signup'
import { AuthProvider } from './Components/AuthContext'   // ✅ import context
import Profile from './Pages/Profile'

function App() {
  return (
    <AuthProvider> {/* ✅ wrap everything inside AuthProvider */}
      <div className='flex-col'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
