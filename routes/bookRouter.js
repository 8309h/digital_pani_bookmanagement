const express = require('express');
const BookRouter = express.Router();
const { createBook, getAllBooks, getBookById,updateBookById, deleteBookById,getbook} = require('../controllers/bookController');

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


// for getting all book
BookRouter.get("/allbook",getbook)

module.exports = BookRouter;
// Aravind Adiga