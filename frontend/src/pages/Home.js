import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 text-primary mb-3">Welcome to the Bookstore</h1>
        <p className="lead text-muted">Discover a wide variety of books and add them to your cart.</p>
        <div className="d-flex justify-content-center mt-4">
          <a href="/books" className="btn btn-outline-primary btn-lg px-4 py-2">
            Browse Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
