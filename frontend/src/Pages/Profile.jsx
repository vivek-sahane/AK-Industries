import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Components/AuthContext'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { auth, db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'


const Profile = () => {
  const { user } = useAuth()
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
  if (!user?.uid) return

  const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data()
      setFavoritesCount(data.favorites?.length || 0)
      setCartCount(data.cart?.length || 0)
    }
  })

  return () => unsub()
}, [user])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-6 text-white flex items-center gap-4">
          <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Hello, {user?.name}</h1>
            <p className="text-sm opacity-80">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {/* Favorites */}
          <Link
            to="/favorite"
            className="p-6 flex items-center justify-center gap-4 hover:bg-indigo-50 transition"
          >
            <FiHeart className="text-red-500" size={32} />
            <div>
              <p className="text-lg font-semibold">{favoritesCount}</p>
              <p className="text-sm text-gray-600">Favorites</p>
            </div>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="p-6 flex items-center justify-center gap-4 hover:bg-indigo-50 transition"
          >
            <FiShoppingCart className="text-green-600" size={32} />
            <div>
              <p className="text-lg font-semibold">{cartCount}</p>
              <p className="text-sm text-gray-600">In Cart</p>
            </div>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
  <Link to="/edit-profile" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
    Edit Profile
  </Link>
  <Link to="/change-password" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
    Change Password
  </Link>
  <button
    onClick={() => auth.signOut()}
    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Log Out
  </button>
</div>

        
      </div>
     

    </div>
  )
}

export default Profile
