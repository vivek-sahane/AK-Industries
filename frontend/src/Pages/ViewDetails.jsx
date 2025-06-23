import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../Components/AuthContext';

export default function ViewDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [adding, setAdding] = useState(false);
  const { user, setCartCount } = useAuth(); // ✅ include setCartCount

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setProduct(docSnap.data());
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }

    setAdding(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userCart = userSnap.data()?.cart || [];

      const existing = userCart.find((item) => item.productId === id);

      let updatedCart;
      if (existing) {
        updatedCart = userCart.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...userCart, { productId: id, quantity: 1 }];
      }

      await updateDoc(userRef, { cart: updatedCart });

      // ✅ Update visible cart count
      setCartCount(updatedCart.length);

      alert("Item added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong.");
    } finally {
      setAdding(false);
    }
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image carousel */}
        <div className="flex-1">
          <div className="overflow-x-auto flex gap-4">
            {product.ImageURLs?.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Product ${i}`}
                className="w-48 h-48 rounded-lg object-cover shadow"
              />
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

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
