const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the Book name"],
    },
    ibn: {
      type: String,
      required: [true, "Please add the Book email address"],
    },
    bookType: {
      type: String,
      required: [true, "Please add the Book phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
