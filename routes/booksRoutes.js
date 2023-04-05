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

router.route("/public").get(getpubBooks)
router.use(validateToken);
router.route("/").get(getBooks).post(createBooks);
router.route("/:id").get(getBook).put(updateBooks).delete(deleteBooks);

module.exports = router;
