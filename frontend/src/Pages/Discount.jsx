import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Discount = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'discounts'));
        const discountData = querySnapshot.docs.map(doc => doc.data());
        setDiscounts(discountData);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <div>
      {discounts.length === 0 ? (
        <p className='text-white text-center'>No Discounts Found</p>
      ) : (
        <div className='flex flex-wrap justify-center gap-6'>
          {discounts.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img src={item.imageURL} alt={item.title} className="h-40 object-cover" />
              <h2 className="text-lg font-bold">{item.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discount;
