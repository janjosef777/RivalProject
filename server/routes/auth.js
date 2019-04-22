const db = require('../db');
const auth = require('../auth/index')
const jwt = require("jsonwebtoken");
module.exports = {
    post: (req, res, next) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        auth.verifyUser(user, (err, res) => {
            if (res === false) {
                console.log("Incorrect email/password");
            } else {
                console.log(res);
                // Issue token
                const payload = { email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
            }
        });
    }
};