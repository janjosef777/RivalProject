var express = require("express");
var router = express.Router();

// get
router.get("/images", (req, res, next) => {
    res.send("server is working");
});

module.exports = router;
