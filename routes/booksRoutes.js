const express = require("express");
const router = express.Router();
const {
  createBooks
} = require("../controllers/booksController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route("/").post(createBooks);

module.exports = router;
