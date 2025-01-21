import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        setError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Books</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="col-md-4" key={book._id}>
              <div className="card shadow-sm mb-4">
                <img src={book.image} alt={book.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.name}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">Price: ${book.price}</p>
                  <Link to={`/books/${book._id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No books available</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
