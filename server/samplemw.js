const storage = require('node-sessionstorage')


var myLogger = function (req, res, next) {
   /*if req.url = auth 
   then get body 
   generate token
   store in session
   send back and store in local

   if url is not auth
   compare tokens in storage and local
   next otherwise call log out 
   */
   console.log(req.headers)
   user = JSON.stringify(req.url)
   if (user == '\"/auth\"' || user == '\"/api/auth\"') {
      console.log(user);
      next()
   } else {
      frontToken = req.get('Authorization')
      backToken = storage.getItem("auth_token")
      if (frontToken == backToken) {
         next();
      } else {
         console.log("tokens does not match!")
         console.log(frontToken);
         console.log(backToken);
      }

   }

}

module.exports = myLogger;