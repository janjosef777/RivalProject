const bcrypt = require('bcrypt');
const db = require('../db');
const saltRounds = 10;

module.exports = {
    /**
     * Usage:
     * user = {
     *     username: 'user',
     *     password: 'password'
     * };
     * addUser(user, (err, res) {
     *     if(err) throw err;
     *     console.log(res);
     * });
     */
    addUser(user, callback) {

        if (!(user = validateUserProps(user)))
            callback(new TypeError('Invalid user object'), false);

        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err)
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
     * verifyUser(user, (err, res) {
     *     if(err) throw err;
     *     console.log(res);
     * });
     */
    verifyUser(user, callback) {

        if (!(user = validateUserProps(user)))
            callback(new TypeError('Invalid user object'), false);

        db.users.get(user.username, (err, dbUser) => {
            if (!dbUser) {
                callback(err, false);
            } else {
                let passOK = bcrypt.compare(user.password, dbUser.passwordHash)
                passOK.then(function (result) {
                    callback(null, result ? dbUser.username : false);
                }).catch(err => {
                    callback(err, false);
                });
            }
        });
    }
}

function validateUserProps(user) {
    if (typeof user !== 'object')
        return null;

    let username = user.username;
    let password = user.password || '';

    if (typeof username !== 'string'
        || !(username = username.trim())
        || typeof password !== 'string') {
        return null;
    }

    return {
        username: username,
        password: password
    };
}