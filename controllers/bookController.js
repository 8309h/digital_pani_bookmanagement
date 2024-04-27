const BookModel = require('../models/bookModel');


// Create a new book
const createBook = async (req, res) => {
    try {
      const { title, author, publicationYear } = req.body;
      const newBook = new BookModel({ title, author, publicationYear });
      await newBook.save();
      res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      console.error('Error creating book:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting all books:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error getting book by ID:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Update book by ID
const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, publicationYear } = req.body;
    const book = await BookModel.findByIdAndUpdate(
      bookId,
      { title, author, publicationYear },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete book by ID
const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully', book });
  } catch (error) {
    console.error('Error deleting book:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Filter Book by Author

const filterBooksByAuthor = async (req, res) => {
  try {
    console.log("hii",req.query)
    const { author, page } = req.query;

    const pageSize = 5;
    const startIndex = (page - 1) * pageSize;

    const books = await BookModel.find({ author })
      .skip(startIndex)
      .limit(pageSize);

    res.status(200).json(books);
  } catch (error) {
    console.error('Error filtering books by author:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Filter by Year
const filterBooksByYear = async (req, res) => {
  try {
    const year = req.query.year;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const startIndex = (page - 1) * limit;

    const books = await BookModel.find({ publicationYear: year })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(books);
  } catch (error) {
    console.error('Error filtering books by year:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
module.exports = {createBook, getAllBooks, getBookById,  updateBookById, deleteBookById, filterBooksByAuthor, filterBooksByYear };
