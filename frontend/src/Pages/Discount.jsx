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
    <div className="py-8 px-4 bg-gradient-to-br from-indigo-50 to-blue-100 min-h-[50vh]">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Latest Discounts</h1>

      {discounts.length === 0 ? (
        <p className='text-gray-700 text-center'>No Discounts Found</p>
      ) : (
        <div className='grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 justify-items-center'>
          {discounts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-[260px] border border-gray-200 hover:border-indigo-400"
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="h-48 w-full object-cover rounded-t-2xl"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available' }}
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-indigo-800">{item.title}</h2>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discount;
