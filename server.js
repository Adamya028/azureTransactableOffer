const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const connectDB = require("./config/db");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
var cors = require("cors");
app.use(cors());
require("dotenv").config();
//connect database
connectDB();

//Init Middleware
app.use(bodyParser.json({ extended: false }));

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')


//define routes
app.use("/api/users", require("./routes/API/users"));
app.use("/api/auth", require("./routes/API/auth"));
app.use("/api/azure", require("./routes/API/azure"));


app.get('', (req, res) => {
    
    res.render('index', { title: 'Home Page'})
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
