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
                const token = issueToken(username);
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
        let token = req.headers.authorization;
        if(!token) {
            res.status(403).send('Not logged in');
            return;
        }
        if(!token.startsWith('Bearer ')) {
            res.status(403).send('Not logged in');
            return;
        }
        token = token.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            if(1000 * decoded.exp < Date.now()) {
                res.status(403).send('Not logged in');
            } else {
                res.jwtToken = issueToken(decoded.username);
                next();
            }
        } catch(err) {
            console.log(err);
            res.status(403).send('Not logged in');
        }
    }
};

function issueToken(username, expiresIn = '1h') {
    const secret = process.env.SECRET;
    return jwt.sign({username: username}, secret, {expiresIn: expiresIn});
}