let mongoose = require("mongoose");

// All properties will have required set to true by default
let bookReturn = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Books",
  },
  issue_date: { type: Date },
  return_date: Date,
  fine_total: Number,
  fine_paid: Number,
  remarks: { type: String, required: false },
});

const BookReturnModel = mongoose.model("BookIssues", bookReturn);

module.exports = BookReturnModel;
