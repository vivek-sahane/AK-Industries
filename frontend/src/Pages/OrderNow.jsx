import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function OrderNow() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery',
  });

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const cart = userSnap.data()?.cart || [];

      const productPromises = cart.map(item =>
        getDoc(doc(db, 'products', item.productId))
      );

      const productDocs = await Promise.all(productPromises);
      const itemsWithDetails = productDocs.map((docSnap, i) => {
        const data = docSnap.data();
        return {
          ...data,
          productId: docSnap.id,
          quantity: cart[i].quantity,
          price: data.price,
        };
      });

      const calcTotal = itemsWithDetails.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      setCartItems(itemsWithDetails);
      setTotal(calcTotal);
    };

    fetchCart();
  }, [user]);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'orders'), {
        ...form,
        userId: user.uid,
        items: cartItems.map(({ name, price, quantity, productId }) => ({
          name,
          price,
          quantity,
          productId,
        })),
        total,
        paymentMethod: form.paymentMethod,
        timestamp: Timestamp.now(),
      });

      // Clear user cart
      await updateDoc(doc(db, 'users', user.uid), { cart: [] });

      alert('Order placed successfully!');
      navigate('/cart');
    } catch (err) {
      console.error('Order failed:', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Place Your Order</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            required
            placeholder="Full Name"
            className="border p-2 rounded"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="border p-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            required
            placeholder="Contact Number"
            className="border p-2 rounded"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="pincode"
            required
            placeholder="Pincode"
            className="border p-2 rounded"
            value={form.pincode}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="address"
          required
          placeholder="Delivery Address"
          className="border p-2 rounded w-full"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="paymentMethod"
          className="border p-2 rounded w-full"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          {/* You can add UPI, card etc. here */}
        </select>

        <div className="text-right font-semibold text-lg text-indigo-700">
          Total Amount: ₹{total}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
