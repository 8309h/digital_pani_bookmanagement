const BookModel = require('../models/bookModel');


// Create a new book
const createBook = async (req, res) => {
    try {
      const { title, author, publicationYear } = req.body;
      const newBook = new BookModel({ title, author, publicationYear});
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

const getbook = async (req, res) => {
  const {limit}=req.query
  const {page}=req.query;
  const skip=(page*limit)-limit
  try {
    const { author, publicationYear } = req.query;
    let query = {};
    if (author) {
      query.author = author;
    }
    if (publicationYear) {
      query.publicationYear = publicationYear;
    }
    const books = await BookModal.find(query).skip(skip).limit(limit);
    res.status(200).json(books);
  } catch (error) {
    console.error('Error getting book:', error);
    res.status(500).json({ "message": 'Getting error while getting book' });
  }
}








  
module.exports = {createBook, getAllBooks, getBookById,  updateBookById, deleteBookById,getbook };
