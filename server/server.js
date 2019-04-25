const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require('multer');
require('dotenv').config();
const db = require('./db');
const auth = require('./auth');
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV;
const secret = process.env.SECRET;
const AuthorizeMW  = require('./AuthorizeMW');
const cors=require('cors');



//middleware does not work without this line
app.use(cors({origin:true,credentials: true}));



if(env != 'development' && env != 'production')
    throw new ReferenceError('Missing or invalid environment variable: NODE_ENV');

// Create admin
require('./setupAdmin');

// To enable CORS
if(env == 'development') {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin,X-Custom-Header, Authorization, X-Requested-With, Content-Type, Accept");
        next();
    });
}

// Set static folder
app.use(express.static(path.join(__dirname, '../build')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", AuthorizeMW, routes);

app.listen(port, function () {
    console.log("Server started on port " + port)
});
