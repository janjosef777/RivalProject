const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    setupAdmin: require('./setupAdmin'),

    /**
     * Usage:
     * user = {
     *     username: 'user',
     *     password: 'password'
     * };
     * addUser(db, user, (err, res) {
     *     if(err) throw err;
     *     console.log(res);
     * });
     */
    addUser(db, user, callback) {

        if(! (user = validateUserProps(user)) )
            callback(new TypeError('Invalid user object'), false);

        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if(err)
                callback(err, false);
            else {
                db.users.add({
                    username: user.username,
                    passwordHash: hash
                }, callback);
            }
        })
    },

    /**
     * Usage:
     * user = {
     *     username: 'user',
     *     password: 'password'
     * };
     * verifyUser(db, user, (err, res) {
     *     if(err) throw err;
     *     console.log(res);
     * });
     */
    verifyUser(db, user, callback) {

        if(! (user = validateUserProps(user)) )
            callback(new TypeError('Invalid user object'), false);

        db.users.get(user.username, (err, dbUser) => {
            if(err)
                callback(err, false);
            else
                bcrypt.compare(user.password, dbUser.passwordHash, callback);
        })
    }
}

function validateUserProps(user) {
    if(typeof user !== 'object')
        return null;

    let username = user.username;
    let password = user.password || '';

    if(typeof username !== 'string'
        || !(username = username.trim())
        || typeof password !== 'string') {
        return null;
    }

    return {
        username: username,
        password: password
    };
}