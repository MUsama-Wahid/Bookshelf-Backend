const asyncHandler = require("express-async-handler");
const Books = require("../models/booksModel");



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


module.exports = {
  createBooks
};
