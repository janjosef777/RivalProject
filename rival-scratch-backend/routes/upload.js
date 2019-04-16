var express = require("express");
var router = express.Router();
var config = require("../config/");

// get
router.get("/images", (req, res, next) => {
    db.products.find((err, data) => {
        if (err)
            res.send(err);

        res.json(data);
    })
});

// get single image
router.get("/images/:id", (req, res, next) => {
    db.products.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// create product
router.post("/products", (req, res, next) => {
    var product = req.body;

    if (!product.product || !product.category
        || !product.price) {
        res.status(400);
        res.json(
            { "error": "Bad data, could not be inserted into the database." }
        )
    } else {
        db.products.save(product, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    }
});
// delete product
router.delete("/products/:id", (req, res, next) => {
    db.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// update product
router.put("/products/:id", (req, res, next) => {
    var product = req.body;
    var changedStudent = {};

    if (product.product) {
        changedStudent.product = product.product;
    }

    if (product.category) {
        changedStudent.categor = product.categor;
    }

    if (product.price) {
        changedStudent.price = product.price;
    }

    if (Object.keys(changedStudent).length == 0) {
        res.status(400);
        res.json(
            { "error": "Bad Data" }
        )
    } else {
        db.products.update({ _id: mongojs.ObjectId(req.params.id) }, changedStudent, {}, function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }
});


module.exports = router;
