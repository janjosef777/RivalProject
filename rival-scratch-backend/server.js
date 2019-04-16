var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var index = require("./routes");
var upload = require("./routes/upload");
var images = require("./routes/images");
var config = require('./config');
var app = express();
require('dotenv').config();

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set static folder
app.use(express.static(path.join(__dirname, "client")));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", uploads);
app.use("/api", images);

app.listen(config.port, function () {
    console.log("Server started on port " + config.port)
});
