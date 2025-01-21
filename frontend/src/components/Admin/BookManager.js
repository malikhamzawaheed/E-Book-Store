import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [newBook, setNewBook] = useState({ name: '', author: '', price: '', category: '', availability: true });
  const [editBook, setEditBook] = useState(null);

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

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      setBooks([...books, response.data]);
      setNewBook({ name: '', author: '', price: '', category: '', availability: true });
    } catch (error) {
      setError('Failed to add book');
    }
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${editBook._id}`, editBook);
      setBooks(books.map((b) => (b._id === editBook._id ? response.data : b)));
      setEditBook(null);
    } catch (error) {
      setError('Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
    } catch (error) {
      setError('Failed to delete book');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Book Manager</h1>
      {error && <p>{error}</p>}
      <ul className="list-group">
        {books.map((book) => (
          <li className="list-group-item" key={book._id}>
            <h2>{book.name}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Category: {book.category}</p>
            <p>Availability: {book.availability ? 'Available' : 'Out of Stock'}</p>
            <button className="btn btn-warning me-2" onClick={() => setEditBook(book)}>Update</button>
            <button className="btn btn-danger" onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          value={newBook.name}
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          placeholder="Name"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          placeholder="Author"
          required
          className="form-control mb-2"
        />
        <input
          type="number"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          placeholder="Price"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          placeholder="Category"
          required
          className="form-control mb-2"
        />
        <label className="form-check-label">
          Availability:
          <input
            type="checkbox"
            checked={newBook.availability}
            onChange={(e) => setNewBook({ ...newBook, availability: e.target.checked })}
            className="form-check-input ms-2"
          />
        </label>
        <button type="submit" className="btn btn-primary mt-2">Add Book</button>
      </form>
      {editBook && (
        <div className="mt-5">
          <h2>Edit Book</h2>
          <form onSubmit={handleUpdateBook}>
            <input
              type="text"
              value={editBook.name}
              onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
              placeholder="Name"
              required
              className="form-control mb-2"
            />
            <input
              type="text"
              value={editBook.author}
              onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
              placeholder="Author"
              required
              className="form-control mb-2"
            />
            <input
              type="number"
              value={editBook.price}
              onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
              placeholder="Price"
              required
              className="form-control mb-2"
            />
            <input
              type="text"
              value={editBook.category}
              onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
              placeholder="Category"
              required
              className="form-control mb-2"
            />
            <label className="form-check-label">
              Availability:
              <input
                type="checkbox"
                checked={editBook.availability}
                onChange={(e) => setEditBook({ ...editBook, availability: e.target.checked })}
                className="form-check-input ms-2"
              />
            </label>
            <button type="submit" className="btn btn-primary mt-2">Update Book</button>
            <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => setEditBook(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookManager;