import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../Components/AuthContext';

export default function Cart() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (!userData?.cart || userData.cart.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const productPromises = userData.cart.map((item) =>
          getDoc(doc(db, 'products', item.productId))
        );

        const productDocs = await Promise.all(productPromises);
        const fetchedProducts = productDocs.map((docSnap, i) => ({
          ...docSnap.data(),
          id: docSnap.id,
          quantity: userData.cart[i].quantity,
        }));

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const updateQuantity = async (productId, delta) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const oldCart = userData.cart;

      const targetItem = oldCart.find((item) => item.productId === productId);
      if (!targetItem) return;

      const newQuantity = targetItem.quantity + delta;

      let updatedCart;
      if (newQuantity <= 0) {
        // Remove from cart
        updatedCart = oldCart.filter((item) => item.productId !== productId);
      } else {
        // Update quantity
        updatedCart = oldCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        );
      }

      await updateDoc(userRef, { cart: updatedCart });

      // Reflect change in local state
      setProducts((prev) =>
        newQuantity <= 0
          ? prev.filter((item) => item.id !== productId)
          : prev.map((item) =>
              item.id === productId ? { ...item, quantity: newQuantity } : item
            )
      );
    } catch (err) {
      console.error('Failed to update quantity or remove item:', err);
    }
  };

  const calculateTotal = (price, quantity) => price * quantity;

  const grandTotal = products.reduce(
    (acc, item) => acc + calculateTotal(item.price, item.quantity),
    0
  );

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;

  if (products.length === 0)
    return <div className="text-center mt-10 text-lg">Your cart is empty.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {products.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.ImageURLs[0]}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <p className="mt-1 font-medium text-green-700">₹{item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              −
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              +
            </button>
            <div className="ml-6 text-md font-medium text-indigo-700">
              ₹{calculateTotal(item.price, item.quantity)}
            </div>
          </div>
        </div>
      ))}

      <div className="text-right text-xl font-bold text-indigo-800">
        Grand Total: ₹{grandTotal}
      </div>

      <div className="text-right">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow">
          Order Now!
        </button>
      </div>
    </div>
  );
}
