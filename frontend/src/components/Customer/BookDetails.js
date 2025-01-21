import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = ({ handleAddToCart }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setError('Failed to fetch book details');
      }
    };

    fetchBook();
  }, [id]);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        bookId: book._id,
        quantity: 1,
      }, { withCredentials: true });
      alert('Book added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data.message : error.message);
      alert('Failed to add to cart');
    }
  };

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!book) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded">
            <div className="card-body">
              <h1 className="text-center text-primary mb-3">{book.name}</h1>
              <div className="row">
                <div className="col-md-6">
                  <img src={book.image} alt={book.name} className="img-fluid rounded mb-3" />
                </div>
                <div className="col-md-6">
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Price:</strong> ${book.price}</p>
                  <p><strong>Category:</strong> {book.category}</p>
                  <p><strong>Availability:</strong> {book.availability ? 'Available' : 'Out of Stock'}</p>
                  <button className="btn btn-primary w-100 mt-3" onClick={handleAdd}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
