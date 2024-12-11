let mongoose = require("mongoose");

// All properties will have required set to true by default
let bookIssue = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Books",
  },
  issue_date: { type: Date, default: Date.now },
  return_date: Date,
  remarks: { type: String, required: false },
});

const BookIssueModel = mongoose.model("BookIssues", bookIssue);

module.exports = BookIssueModel;
