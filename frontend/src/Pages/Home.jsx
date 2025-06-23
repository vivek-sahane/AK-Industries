import React from 'react'
import ProductList from './ProductList'
import Discount from './Discount'
import MainDesign from './MainDesign'


const Home = () => {
  return (
    <div className="p-4 space-y-10 ">
      
      <section>
        <MainDesign/>
      </section>

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
