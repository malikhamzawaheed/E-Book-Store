import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', { withCredentials: true });
        setCartData(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error.message);
        setError('Failed to load cart items');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    if (cartData.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        items: cartData,
        totalAmount: cartData.reduce((total, item) => total + item.bookId.price * item.quantity, 0),
      }, { withCredentials: true });
      alert('Order placed successfully');
      setCart([]); // Clear the cart after placing the order
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data.message : error.message);
      alert('Failed to place order');
    }
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  const totalAmount = cartData.reduce((total, item) => total + item.bookId.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h1>Cart</h1>
      {cartData.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartData.map((item, index) => (
              <li className="list-group-item" key={index}>
                {item.bookId.name} - ${item.bookId.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h4 className="mt-3">Total: ${totalAmount.toFixed(2)}</h4>
          <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

