const express = require("express");
const router = express.Router();
const moment = require("moment");

const User = require("../models/userModel");
const auth = require("../middlewares/auth");
const BookModel = require("../models/bookModel");

router.get("/all", async (req, res) => {
  try {
    let books = await BookModel.find({}, { _id: 0, __v: 0 });
    let mod_books = [];
    books.forEach((book) => {
      let mod_book = {
        s_no: book.s_no,
        name: book.name,
        author: book.author,
        count: book.count,
        cost: book.cost,
        proc_date: moment(book.proc_date).format("YYYY-MM-DD"),
      };
      mod_books.push(mod_book);
    });
    console.log(books);
    res.json({ books: mod_books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/info", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(400).send({ error: "Can't find the user!" });
    }

    const { s_no } = req.body;

    if (!s_no) {
      return res.status(400).json({ error: "Please enter all the fields -_-" });
    }
    const book = await BookModel.find({ s_no: s_no });
    if (!book) {
      return res.status(400).send({ error: "Can't find the book!" });
    }

    res.json({
      s_no: book.s_no,
      name: book.name,
      author: book.author,
      count: book.count,
      cost: book.cost,
      proc: book.proc_date,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const user2 = await User.findById(req.user_id);
    if (!user2) {
      return res.status(400).send({ error: "Can't find the user!" });
    }
    if (!user2.is_admin) {
      return res.status(400).send({ error: "User not admin" });
    }

    const { s_no, name, author, count, cost, proc } = req.body;

    if (!s_no || !name || !author || !count || !cost || !proc) {
      return res.status(400).json({ error: "Please enter all the fields -_-" });
    }
    const s_no_exists = await User.findOne({ s_no });
    if (s_no_exists) {
      return res.status(400).json({ error: "Serial No. already taken ;)" });
    }

    // console.log(`${s_no} ${name} ${author} ${count} ${cost} ${proc}`);

    const book = new BookModel({
      s_no: s_no,
      name,
      author,
      count,
      cost,
      proc_date: proc,
    });
    console.log(book);

    await book.save();
    res.json({ text: "Book created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const user3 = await User.findById(req.user_id);
    if (!user3) {
      return res.status(400).send({ error: "Can't find the user!" });
    }
    if (!user3.is_admin) {
      return res.status(400).send({ error: "User not admin" });
    }

    const { s_no, name, author, count, cost, proc } = req.body;
    console.log(s_no, name, author, count, cost, proc);
    if (!s_no || !name || !author || !count || !cost || !proc) {
      return res.status(400).json({ error: "Please enter all the fields -_-" });
    }
    const s_no_exists = await User.findOne({ s_no });
    if (s_no_exists) {
      return res.status(400).json({ error: "Serial No. already taken ;)" });
    }

    // console.log(`${s_no} ${name} ${author} ${count} ${cost} ${proc}`);

    const book = new BookModel({
      s_no: s_no,
      name,
      author,
      count,
      cost,
      proc_date: proc,
    });
    console.log(book);

    await book.save();
    res.json({ text: "Book created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout should be done at front-end

module.exports = router;
