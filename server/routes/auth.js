const auth = require('../auth/index')
const jwt = require("jsonwebtoken");

module.exports = {
    post: (req, res, next) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        function sendToken(token) {
            console.log('Token stuff');
            console.log(token);
            console.log(jwt.verify(token, process.env.SECRET));
            console.log(jwt.verify('token', process.env.SECRET));
            res.json({ "token": token })
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
    },
    ensureLoggedIn: (req, res, next) => {
        if(!req || !req.headers || !req.headers.Authorization) {
            res.status(403).redirect('/');
            return;
        }
        let token = req.headers.Authorization;
        if(!token.startsWith('Bearer ')) {
            res.status(403).redirect('/');
            return;
        }
        token = token.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            if(1000 * decoded.exp < Date.now()) {
                res.status(403).redirect('/');
            } else {
                res.header
            }
        } catch(err) {
            console.log(err);
            res.status(403).redirect('/');
        }
    }
};