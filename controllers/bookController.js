const express = require("express");
const BookModel = require("../models/bookModel");

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    const newBook = new BookModel({ title, author, publicationYear });
    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error.message);
    res.status(500).json({ message: "Internal server error1" });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting all books:", error.message);
    res.status(500).json({ message: "Internal server error2" });
  }
};

const hitiing = async (req, res) => {
  console.log("hellooooo");
  console.log(req.url);
  console.log(req.body);
  const { author, publicationYear } = req.body;
  try {
    const books = await BookModel.find({
      $and: [{ author: author }, { publicationYear: publicationYear }],
    });
    res.status(200).json(books);
  } catch (err) {
    console.log("This is error while filtering");
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  // console.log(req.url)
  try {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error getting book by ID:", error.message);
    res.status(500).json({ message: "Internal server error3" });
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
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Internal server error4" });
  }
};

// Delete book by ID
const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findByIdAndDelete(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ message: "Internal server error5" });
  }
};

const getbookByFilter = async (req, res) => {
  console.log("heloo from server");

  const { limit, page, author, publicationYear } = req.body;
  console.log(req.url);
  const skip = page * limit - limit;
  try {
    const { author, publicationYear } = req.body;
    let query = {};
    if (author) {
      query.author = author;
    }
    if (publicationYear) {
      query.publicationYear = publicationYear;
    }
    // const books = await BookModal.find(query).skip(skip).limit(limit);
    const books = await BookModel.find({
      $and: [{ author: author }, { publicationYear: publicationYear }],
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting book:", error);
    res.status(500).json({ message: "Getting error while getting book" });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getbookByFilter,
  hitiing,
};
