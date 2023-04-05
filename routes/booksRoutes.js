const express = require("express");
const router = express.Router();
const {
  createBooks,
  updateBooks,
  deleteBooks
} = require("../controllers/booksController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route("/").post(createBooks);
router.route("/:id").put(updateBooks).delete(deleteBooks);

module.exports = router;
