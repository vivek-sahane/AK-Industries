import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home"
import Navbar from './Components/Navbar/Navbar'
import AboutUs from "./Pages/AboutUs"
import Address from "./Pages/Address"
import LogIn from "./Pages/LogIn"
import Cart from "./Pages/Cart"

function App() {
  


  return (
    <div className='flex-col'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/address" element={<Address/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<LogIn/>} />
        </Routes>
      </Router>
      
      
    </div>
  )
}

export default App
