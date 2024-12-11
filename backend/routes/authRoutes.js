// Ref(Authentication with MERN Stack): https://namanrivaan.medium.com/authentication-with-mern-stack-9a4dbcd2290d

const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const auth = require("../middlewares/auth");

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

    res.json({ user_id: user.user_id, name: user.name, is_admin: user.is_admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { user_id, password, confirm_password, name } = req.body;
    if (!user_id || !password || !confirm_password || !name) {
      return res.status(400).json({ error: "Please enter all the fields -_-" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be atleast 6 characters :)" });
    }
    if (confirm_password !== password) {
      return res
        .status(400)
        .json({ error: "Both the passwords dont match -_-" });
    }
    const exists = await User.findOne({ user_id });
    if (exists) {
      return res.status(400).json({ error: "User ID already taken ;)" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    const user = new User({
      user_id,
      name,
      password: hashedPassword,
      is_admin: false,
    });

    await user.save();
    res.json({ text: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { user_id, password } = req.body;
    if (!user_id || !password) {
      return res.status(400).json({ error: "Please enter all the fields -_-" });
    }

    const user = await User.findOne({ user_id });
    if (!user) {
      return res
        .status(400)
        .send({ error: "User with this user_id does not exist" });
    }

    const isMatching = await bcryptjs.compare(password, user.password);

    if (!isMatching) {
      return res.status(400).send({ error: "Incorrect password :(" });
    }
    const token = jwt.sign({ id: user._id }, JWT_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/is-token-valid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      // No token found
      return res.json(false);
    }

    const verified = jwt.verify(token, JWT_KEY);
    if (!verified) {
      // Invalid token (verification failed by jwt)
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      // Invalid token (user not found)
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/is-admin", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user_id);
    if (!user) {
      return res.status(400).send({ error: "Can't find the user!" });
    }

    res.json(user.is_admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout should be done at front-end

module.exports = router;
