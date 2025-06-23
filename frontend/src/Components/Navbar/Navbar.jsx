import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ak_ind_logo from "../../assets/ak_ind_logo.jpg"
import add_to_cart from "../../assets/add_to_cart.jpeg"
import threedot from "../../assets/threedot.png"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()
  const dotRef = useRef()

  // Toggle the menu
  const toggleMenu = (e) => {
    // Prevent the click from immediately triggering the outside click handler
    e.stopPropagation()
    setShowMenu(showMenu => !showMenu)
  }

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      // Check if click is outside both menu and three-dot icon
      if (menuRef.current && !menuRef.current.contains(e.target) && 
          dotRef.current && !dotRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className='relative bg-gradient-to-r from-indigo-900'>

      {/* Navbar Row */}
      <div className='flex justify-around mx-auto gap-x-14 sm:gap-x-10 md:gap-x-20 p-6 items-center'>

        <img src={ak_ind_logo} alt='Logo' className='h-16 -m-4' />

        <Link to="/" className="group cursor-pointer text-white text-2xl hover:font-bold">
          Home
          <div className="mt-1 rounded-2xl h-1 w-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </Link>

        <div className="hidden sm:block group">
          <Link to="/about" className="text-white hover:font-bold text-2xl">About Us</Link><div className="mt-1 rounded-2xl h-1 w-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

        </div>

        <div className="hidden sm:block group">
          <Link to="/address" className="text-white hover:font-bold border-black text-2xl">Favorite</Link>
          <div className="mt-1 rounded-2xl h-1 w-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </div>

        <Link to="/cart" className="hidden sm:block">
          <div className="flex -mt-2 cursor-pointer">
            <img src={add_to_cart} alt='Cart' className='rounded-4xl h-10 w-10' />
            <div className='rounded-4xl bg-red-500 h-5 w-5 -ml-2 flex items-center justify-center text-white'>0</div>
          </div>
        </Link>

        <Link to="/login" className="hidden sm:block">
            <div className="px-5 py-2 cursor-pointer rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md hover:from-indigo-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300">
                LogIn
            </div>
       </Link>

        {/* Three-dot icon for small screens */}
        <div className="block sm:hidden" ref={dotRef}>
          <img
            src={threedot}
            alt='menu'
            className='cursor-pointer h-10 w-10 rounded-2xl'
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Floating Card Menu with animation */}
      <div
        ref={menuRef}
        className={`absolute top-full right-4 mt-2 bg-white rounded-lg shadow-lg p-4 z-50 sm:hidden flex flex-col gap-3 text-black w-40 transition-all duration-200 origin-top-right transform ${
          showMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <Link to="/about" onClick={() => setShowMenu(false)}>About Us</Link>
        <Link to="/address" onClick={() => setShowMenu(false)}>Address</Link>
        <Link to="/cart" onClick={() => setShowMenu(false)}>Cart</Link>
        <Link to="/login" onClick={() => setShowMenu(false)}>Login</Link>
      </div>
    </div>
  )
}

export default Navbar