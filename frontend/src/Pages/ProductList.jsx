import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../Components/AuthContext'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"))
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProducts(result)
    }

    const fetchFavorites = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || [])
        }
      }
    }

    fetchProducts()
    fetchFavorites()
  }, [user])

  const toggleFavorite = async (productId) => {
    if (!user) return alert("Please log in to add favorites.")

    const isFavorite = favorites.includes(productId)
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId]

    setFavorites(updatedFavorites)
    await updateDoc(doc(db, "users", user.uid), { favorites: updatedFavorites })
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6'>
      {products.map(product => (
        <div key={product.id}>
          <div className='rounded-2xl bg-white shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-200'>
            {/* Image Section */}
            <div className='relative'>
              {user && (
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className='absolute top-3 right-3 z-10 text-red-500 text-2xl'
                >
                  {favorites.includes(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
              )}
              <img
                src={product.ImageURLs?.[0]}
                alt={product.name}
                className='h-48 w-full object-cover rounded-t-2xl'
                onError={(e) => { e.target.src = 'https://via.placeholder.com/200' }}
              />
            </div>

            {/* Info Section */}
            <div className='p-5'>
              <h2 className='text-center text-xl font-bold text-indigo-800'>{product.name}</h2>

              <div className='flex justify-between mt-3 text-gray-600 text-sm font-medium'>
                <span>Available: {product.quantity}</span>
                <span className='text-green-600'>{product.discount} Off</span>
              </div>

              <div className="my-3">
                <hr className="border-gray-300 w-[70%] mx-auto" />
              </div>

              <div className='bg-gradient-to-r from-green-300 to-green-400 text-center text-lg font-semibold text-gray-800 py-2 rounded-xl w-[60%] mx-auto border border-black'>
                ₹{product.price}
              </div>

              <div className="mt-4 text-center">
                <button className="px-5 py-2 cursor-pointer rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-md hover:from-indigo-500 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
