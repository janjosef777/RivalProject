const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});
const ensureLoggedIn = require('../../auth/middleware/ensureLoggedIn');

const routes = {
    auth: require('./auth'),
    campaigns: require('./campaigns'),
    images: require('./images'),
    assignlink: require('./AssignCardLink'),
    templates: require('./templates'),
    cardresults: require('./cardResults')
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

router.post("/template", ensureLoggedIn, routes.templates.post);
router.get("/template/:id", ensureLoggedIn,routes.templates.get);

router.get("/cardresults", ensureLoggedIn, routes.cardresults.getAll);
router.post("/cardresults", ensureLoggedIn, routes.cardresults.post);

router.get('/assignlink/par/:parid/camp/:campid', routes.assignlink.get);

module.exports = router;