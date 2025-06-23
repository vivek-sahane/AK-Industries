import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ViewDetails() {
  const { id } = useParams(); // product ID
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct(docSnap.data());
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Image carousel */}
        <div className="flex-1">
          <div className="overflow-x-auto flex gap-4">
            {product.ImageURLs?.map((url, i) => (
              <img key={i} src={url} alt={`Product ${i}`} className="w-48 h-48 rounded-lg object-cover shadow" />
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-indigo-700">{product.name}</h2>

          <div className="text-lg text-green-700 font-semibold">
            Price: ₹{product.price}
          </div>

          {product.discount && (
            <div className="text-sm bg-red-100 text-red-600 px-3 py-1 inline-block rounded-full">
              Discount: {product.discount}
            </div>
          )}

          <div className="text-md text-gray-800">
            <strong>Quantity Available:</strong> {product.quantity}
          </div>

          <div className="text-gray-700 leading-relaxed">
            <strong>Description:</strong><br />
            {product.description}
          </div>

          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
