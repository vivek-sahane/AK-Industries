import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const DiscountBanner = () => {
  const [discounts, setDiscounts] = useState([])

  useEffect(() => {
    const fetchDiscounts = async () => {
      const querySnapshot = await getDocs(collection(db, "discounts"));
      const result = querySnapshot.docs.map(doc => doc.data());
      setDiscounts(result);
    }

    fetchDiscounts();
  }, [])

  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {discounts.map((item, idx) => (
        <img key={idx} src={item.imageURL} alt={item.title} className='w-full md:w-1/2 lg:w-1/3 rounded shadow-md' />
      ))}
    </div>
  )
}

export default DiscountBanner
