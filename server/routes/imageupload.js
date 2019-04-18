module.exports = {
    // post
    post: (req, res, next) => {
        console.log(req.file);
        res.send(req.file ? 'Received file ' + req.file.originalname : 'Did not receive a file');
    }
};