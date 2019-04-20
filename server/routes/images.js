const sharp = require('sharp');
const fnHelper = require('../io/filename-helper');
const mkdirp = require('mkdirp');
const db = require('../db');
const uploadUrl = '/uploads/'; // Start with and end with a slash

module.exports = {
    // get
    getAll: (req, res, next) => {
        db.images.getAll((err, images) => {
            if(err)
                return handleErr(err, res, 500);
            images.forEach(image => {
                image.path = uploadUrl + image.filename;
            });
            res.send(images);
        })
    },
    // post
    post: (req, res, next) => {
        if(!/^image\b/.test(req.file.mimetype)) {
            res.status(400).send('Not an image!');
        } else {
            const image = sharp(req.file.path);
            image.metadata().then(metadata => {

                const dir = 'public' + uploadUrl;
                const filename = fnHelper.ensureUnique(dir,
                    req.file.originalname,
                    metadata.format);

                mkdirp(dir, err => {
                    if(err)
                        return handleErr(err, res, 500);
                    image.toFile(dir + filename, (err, savedImg) => {
                        if(err)
                            return handleErr(err, res, 500);
                        const jsonImage = {
                            filename: filename,
                            width: savedImg.width,
                            height: savedImg.height
                        };
                        db.images.add(jsonImage, (err, id) => {
                            if(err)
                                return handleErr(err, res, 500);
                            jsonImage.path = uploadUrl + filename;
                            jsonImage.id = id

                            // Success
                            res.send(jsonImage);
                        });
                    });
                });
            }).catch(err =>
                handleErr(err, res, 400, 'Invalid or corrupt image file')
            );
        }
    }
};

function handleErr(err, res, status, message) {
    console.log(err);
    res.status(status).send(message);
}