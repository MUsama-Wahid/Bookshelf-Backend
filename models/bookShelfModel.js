const mongoose = require("mongoose");

const bookShelfSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please add the User ID"],
    },
    bookId: {
      type: String,
      required: [true, "Please add the Book ID"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookshelf", bookShelfSchema);
