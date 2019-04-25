const auth = require('../auth/index')
const jwt = require("jsonwebtoken");
const storage = require('node-sessionstorage')

module.exports = {
    post: (req, res, next) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        function sendToken(token) {
            res.json({ "token": token })
            storage.setItem("auth_token", token)
            console.log(storage.getItem("auth_token"))
        }
        function userVerified(err, username) {
            if (username === false) {
                if(err)
                    console.log(err);
                console.log("Incorrect username/password");
                res.status(403).send("Incorrect username/password");
            } else {
                console.log(username);
                //issue token 
                const payload = { username: username };
                const secret = process.env.SECRET;
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                sendToken(token);
            }
        }
        auth.verifyUser(user, userVerified)
    },
    add: (req,res,next) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        function confirmAdd(){
            res.json({
                username: req.body.username,
                password: req.body.password
            })
        }
        function successAdd(err, res) {
            if (!res){
                if(err)
                    console.log(err);
                console.log("unable to add User!");
            } else {
                console.log(res);
                confirmAdd();
            }
        }

        auth.addUser(user, successAdd)
    }
};