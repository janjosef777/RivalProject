const auth = require('../auth/index')

module.exports = {
    post: (req, res, next) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        function sendToken(token) {
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
                const token = auth.issueToken(username);
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
                token: res.jwtToken,
                data: {
                    username: req.body.username,
                    success: true
                }
            });
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