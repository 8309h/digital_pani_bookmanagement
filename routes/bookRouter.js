const express = require('express');
const BookRouter = express.Router();
const { createBook, getAllBooks, getBookById,updateBookById, deleteBookById, filterBooksByAuthor, filterBooksByYear } = require('../controllers/bookController');

// Create a new book
BookRouter.post('/', createBook);
// Get all books
BookRouter.get('/', getAllBooks);

// Get book by ID
BookRouter.get('/:id', getBookById);

// Update book by ID
BookRouter.put('/:id', updateBookById);

// Delete book by ID
BookRouter.delete('/:id', deleteBookById);

// filter by auther 
BookRouter.get('/books/filter/by-author',filterBooksByAuthor)

// filter by year
BookRouter.get('/:year',filterBooksByYear)

module.exports = BookRouter;
// Aravind Adiga