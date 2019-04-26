const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './temp-uploads'});

const routes = {
    auth: require('./auth'),
    campaigns: require('./campaigns'),
    images: require('./images'),
    assignlink: require('./AssignCardLink')
};

router.post("/auth", routes.auth.post);
router.post("/auth/add", routes.auth.add);

router.get("/campaigns", routes.campaigns.getAll);
router.get("/campaigns/:id", routes.campaigns.get);
router.post("/campaigns", routes.campaigns.post);
router.put("/campaigns/:id", routes.campaigns.put);
router.delete("/campaigns/:id", routes.campaigns.delete);

router.get("/images", routes.images.getAll);
router.get("/images/:id", routes.images.get);
router.post("/images", upload.single('image'), routes.images.post);
router.delete("/images/:id", routes.images.delete);

router.get('/assignlink/par/:parid/camp/:campid', routes.assignlink.get);

module.exports = router;