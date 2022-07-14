const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
app.use(cors());
require("dotenv").config();
//connect database
connectDB();

//create session
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Init Middleware
app.use(bodyParser.json({ extended: false }));

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

// Set Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
app.set("view engine", "ejs");




var indexRouter = require('./routes/index');

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/azure", require("./routes/azure"));
app.use('/', indexRouter);


//Login page
app.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "dashboard" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
