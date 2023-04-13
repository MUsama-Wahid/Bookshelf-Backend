const express = require("express");
const router = express.Router();
const {
    addToShelf,
    delFromShelf,
    getBookShelf
} = require("../controllers/bookShelfController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").post(addToShelf).get(getBookShelf);
router.route("/:id").delete(delFromShelf);

module.exports = router;