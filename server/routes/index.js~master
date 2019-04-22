const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});

const routes = {
    images: require('./images')
};

router.get("/images", routes.images.getAll);
router.get("/images/:id", routes.images.get);
router.post("/images", upload.single('image'), routes.images.post);
router.delete("/images/:id", routes.images.delete);

module.exports = router;