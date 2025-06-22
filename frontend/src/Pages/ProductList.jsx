import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const result = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(result);
    }

    fetchProducts();
  }, [])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
      {products.map(product => (
        <div key={product.id} className='bg-white rounded shadow p-4 hover:shadow-lg transition'>
          <img
            src={product.ImageURLs?.[0]}
            alt={product.name}
            className='h-40 w-full object-cover rounded'
            onError={(e) => { e.target.src = 'https://via.placeholder.com/200' }}
          />
          <h2 className='text-lg font-semibold mt-2'>{product.name}</h2>
          <p className='text-gray-700'>₹{product.price}</p>
          <p className='text-green-600'>{product.discount} off</p>
          <p className='text-sm text-gray-500'>Qty: {product.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
