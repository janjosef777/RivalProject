const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});

const routes = {
    images: require('./images')
};

router.get("/images", routes.images.getAll);
router.post("/images", upload.single('image'), routes.images.post);

module.exports = router;