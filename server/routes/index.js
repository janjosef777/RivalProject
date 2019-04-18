const express = require("express");
const router = express.Router();

const routes = {
    imageupload: require('./imageupload')
};

router.post("/imageupload", routes.imageupload.post);

module.exports = router;