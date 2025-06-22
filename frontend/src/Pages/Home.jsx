import React from 'react'
import ProductList from './ProductList'
import Discount from './Discount'


const Home = () => {
  return (
    <div className="p-4 space-y-10">
      <h1 className="text-2xl font-bold text-center text-indigo-900">Welcome to AK Industries</h1>

      {/* Discount Banners */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Current Offers</h2>
        <Discount/>
      </section>

      {/* Product Cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Our Products</h2>
        <ProductList/>
      </section>
    </div>
  )
}

export default Home
