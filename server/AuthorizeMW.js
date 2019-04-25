const storage = require('node-sessionstorage')


var Authorize = function (req, res, next) {
   user = JSON.stringify(req.url)
   if (user == '\"/auth\"' || user == '\"/api/auth\"') {
      console.log(user);
      next()
   } else {
      frontToken = req.get('authorization')
      backToken = storage.getItem("auth_token")
      console.log(frontToken);
      console.log(backToken);

      if (typeof backToken !== "undefined") {
         if (frontToken == backToken) {
            console.log("TOKEN MATCH");
            next();
         } else {
            console.log("TOKEN DOES NOT MATCH")
            res.sendStatus(403)
         }
      } else {
         res.sendStatus(404)
      }


   }

}



module.exports = Authorize;