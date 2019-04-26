const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});
const ensureLoggedIn = require('../auth/middleware/ensureLoggedIn');

const routes = {
    auth: require('./auth'),
    campaigns: require('./campaigns'),
    images: require('./images')
};

router.post("/auth", routes.auth.post);
router.post("/auth/add", ensureLoggedIn, routes.auth.add);

router.get("/campaigns", ensureLoggedIn, routes.campaigns.getAll);
router.get("/campaigns/:id", ensureLoggedIn, routes.campaigns.get);
router.post("/campaigns", ensureLoggedIn, routes.campaigns.post);
router.put("/campaigns/:id", ensureLoggedIn, routes.campaigns.put);
router.delete("/campaigns/:id", ensureLoggedIn, routes.campaigns.delete);

router.get("/images", ensureLoggedIn, routes.images.getAll);
router.get("/images/:id", ensureLoggedIn, routes.images.get);
router.post("/images", ensureLoggedIn, upload.single('image'), routes.images.post);
router.delete("/images/:id", ensureLoggedIn, routes.images.delete);

module.exports = router;