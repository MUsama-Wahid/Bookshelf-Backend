const asyncHandler = require("express-async-handler");
const Bookshelf =require("../models/bookShelfModel")
const Books = require("../models/booksModel");


//Add Book to Shelf
const addToShelf = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const {bookId} = req.body;
    const userId= req.user.id

    const book = await Bookshelf.findOne({bookId,userId});
    if (book) {
      res.status(400);
      throw new Error("Book Exists");
    }

    if (!req.user.id || !bookId) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const books = await Bookshelf.create({
      userId:req.user.id,
      bookId:bookId
    });
  
    res.status(201).json(books);
  });

  //Delete book
const delFromShelf = asyncHandler(async (req, res) => {
  const bookId = req.params.id
    const books = await Bookshelf.find({bookId});
    if (!books) {
      res.status(404);
      throw new Error("Book not found");
    }
    await Bookshelf.deleteOne({ bookId: req.params.id ,userId:req.user.id });
    res.status(200).json(books);
  });

  //Get book by id
const getBookShelf = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const books = await Bookshelf.find({userId});
    if (!books) {
      res.status(404);
      throw new Error("Book not found");
    }
    
    const bookIds = books.map(bk => bk.bookId); 
  const thisbook = await Books.find({ _id: { $in: bookIds } });
  console.log(thisbook);
  res.status(200).json(thisbook);
  });


  module.exports = {
    addToShelf,
    delFromShelf,
    getBookShelf
  };

