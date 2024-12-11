// Ref(Authentication with MERN Stack): https://namanrivaan.medium.com/authentication-with-mern-stack-9a4dbcd2290d

const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const auth = require("../middlewares/auth");
const BookModel = require("../models/bookModel");

// Should definitely be changed as this is supposed to be private
// should also match the one in ./middlewares/auth.js
const JWT_KEY = "the_definition_of_insanity";

/* Note: Following routes are prefixed with `/auth/` */

router.get("/info", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(400).send({ error: "Can't find the user!" });
    }

    res.json({
      user_id: user.user_id,
      name: user.name,
      is_admin: user.is_admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Serial No 	Name of Book  	Author Name 	Category 	Status	Cost	Procurement Date

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

router.post("/update",auth, async (req, res) => {
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
