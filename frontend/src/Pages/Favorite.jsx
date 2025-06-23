import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Components/AuthContext'
import { Link } from 'react-router-dom'

const Favorite = () => {
  const { user } = useAuth()
  const [favoriteProducts, setFavoriteProducts] = useState([])

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (!user) return

      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (userDoc.exists()) {
        const favorites = userDoc.data().favorites || []
        const products = await Promise.all(
          favorites.map(async (id) => {
            const prodDoc = await getDoc(doc(db, "products", id))
            return prodDoc.exists() ? { id, ...prodDoc.data() } : null
          })
        )
        setFavoriteProducts(products.filter(Boolean))
      }
    }

    fetchFavoriteProducts()
  }, [user])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-bold text-red-500">Please log in to view your favorites.</h2>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-center text-indigo-800 mb-6'>Your Favorite Products ❤️</h1>

      {favoriteProducts.length === 0 ? (
        <p className='text-center text-gray-600'>No favorites yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {favoriteProducts.map(product => (
            <div key={product.id} className='rounded-2xl bg-white shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border'>
              <img
                src={product.ImageURLs?.[0]}
                alt={product.name}
                className='h-48 w-full object-cover rounded-t-2xl'
              />
              <div className='p-4'>
                <h2 className='text-xl font-semibold text-indigo-700 text-center'>{product.name}</h2>
                <p className='text-center text-gray-600 mt-2'>₹{product.price}</p>
                <Link to={`/product/${product.id}`}>
                  <div className='mt-4 text-center'>
                    <button className="px-5 py-2 cursor-pointer rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md hover:from-indigo-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorite
