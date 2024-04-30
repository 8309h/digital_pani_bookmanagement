const express = require('express');
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
    getbookByFilter,
    hitiing
  }  =  require ("../controllers/bookController")
 const BookRouter = express.Router();



// Create a new book
BookRouter.post('/', createBook);
// Get all books
BookRouter.get('/', getAllBooks);

// for getting all book
BookRouter.get("/filter", hitiing)

// Get book by ID
BookRouter.get('/:id', getBookById);

// Update book by ID
BookRouter.put('/:id', updateBookById);

// Delete book by ID
BookRouter.delete('/:id', deleteBookById);

BookRouter.get('/getfilter',getbookByFilter)



 

module.exports = BookRouter;
// // Aravind Adiga
// const express = require('express');
// const BookRouter = express.Router();

// BookRouter.post('/books', async (req, res) => {
//     try {
//       const { title, author, publicationYear } = req.body;
//       const book = new BookModel({ title, author, publicationYear });
//       await book.save();
//       res.status(201).json(book);
//     } catch (error) {
//       console.error('Error creating book:', error);
//       res.status(500).json({ message: 'Error creating book' });
//     }
//   });

//   module.exports = BookRouter
  