const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});

const routes = {
    imageupload: require('./imageupload')
};

router.post("/imageupload", upload.single('image'), routes.imageupload.post);

module.exports = router;