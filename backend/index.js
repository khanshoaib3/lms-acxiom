const express = require("express");
const app = express();
const cors = require('cors')
let db = require("./db")

/********** App Settings **********/
const HOST = "localhost";
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.json()); // Parses req.body content (in json) to javascript object
app.use(cors());
/**********************************/



/*********** Routes ***********/
const authRoutes = require('./routes/authRoutes');


// Authentication Routes (extended)
app.use("/auth", authRoutes);

// Home Routes
app.get("/", (req, res) => {
  res.send("<h1><i>Hello World</i></h1>");
});
/*******************************/




app.listen(PORT, HOST, (err) => {
  if (!err) {
    console.log("Server started...");
    console.log(`Server adress: http://${HOST}:${PORT}`);
  } else {
    console.log(`Error Occured: ${err}`);
  }
});
