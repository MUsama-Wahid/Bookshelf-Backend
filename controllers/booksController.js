const asyncHandler = require("express-async-handler");
const Books = require("../models/booksModel");
const Bookshelf =require("../models/bookShelfModel")


// Get all books of logedin user
const getBooks = asyncHandler(async (req, res) => {
  const books = await Books.find({ user_id: req.user.id });
  res.status(200).json(books);
});

// Get public books
const getpubBooks = asyncHandler(async (req, res) => {
    const books = await Books.find({ bookType: "public" });
    res.status(200).json(books);
  });

//Create New books
const createBooks = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, ibn, bookType } = req.body;
  if (!name || !ibn || !bookType) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const books = await Books.create({
    name,
    ibn,
    bookType,
    user_id: req.user.id,
  });

  res.status(201).json(books);
});

//Get book by id
const getBook = asyncHandler(async (req, res) => {
  const books = await Books.findById(req.params.id);
  if (!books) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.status(200).json(books);
});

//Update books
const updateBooks = asyncHandler(async (req, res) => {
  const books = await Books.findById(req.params.id);
  if (!books) {
    res.status(404);
    throw new Error("Book not found");
  }
  if(req.body.bookType== 'private')
  {
    const bookss = await Bookshelf.find({bookId:req.params.id});
    if(bookss){
      await Bookshelf.deleteOne({ bookId: req.params.id});
    }
  }

  if (books.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user books");
  }

  const updatedbook = await Books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedbook);
});

//Delete book
const deleteBooks = asyncHandler(async (req, res) => {
  const books = await Books.findById(req.params.id);
  if (!books) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (books.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user books");
  }
  await Books.deleteOne({ _id: req.params.id });
  res.status(200).json(books);
});

module.exports = {
  getBooks,
  createBooks,
  getBook,
  updateBooks,
  deleteBooks,
  getpubBooks
};
