const express = require("express");
const router = express.Router();
const {
  getBooks,
  createBooks,
  getBook,
  updateBooks,
  deleteBooks,
  getpubBooks
} = require("../controllers/booksController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.post(createBooks);
router.route("/:id").put(updateBooks).delete(deleteBooks);

module.exports = router;
