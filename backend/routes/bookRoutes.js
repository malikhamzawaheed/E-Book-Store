const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(adminProtect, addBook);

router.route('/:id')
  .get(getBookById)
  .put(adminProtect, updateBook)
  .delete(adminProtect, deleteBook);

module.exports = router;