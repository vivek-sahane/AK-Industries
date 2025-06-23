import React from 'react'
import kurdai from "../assets/kurdai.png"

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-72 bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl cursor-pointer transition-all duration-300"
    >
<img
  src={product.imageURLs}
  alt="Kurdai"
  style={{ height: '200px', width: '200px', objectFit: 'cover' }}
/>


      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
        <p className="text-sm text-gray-500">Available: {product.quantity}</p>
        {product.discount && (
          <p className="text-sm text-green-600 font-semibold">
            Discount: {product.discount}%
          </p>
        )}
      </div>
      <div className="mt-4 text-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          View Details
        </button>
      </div>
    </div>
  )
}

export default ProductCard
