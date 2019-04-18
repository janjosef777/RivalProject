const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const multer = require('multer');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const db = require('./db');
const auth = require('./auth');

// Create admin
require('./setupAdmin');

// To enable CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Set static folder
app.use(express.static(path.join(__dirname, '../build')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: '../uploads'}).single('image'));

app.use("/api", routes);

app.listen(port, function () {
    console.log("Server started on port " + port)
});
