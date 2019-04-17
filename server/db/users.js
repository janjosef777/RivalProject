module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM login_user',
        get: 'SELECT * FROM login_user WHERE username=?',
        add: 'INSERT INTO login_user (username, password_hash, is_admin) VALUES (?,?,?)'
    };
    return {
        getAll(callback) {
            db.onReady = () => con.query(queries.getAll, (err, res) => {
                callback(err, err ? [] : res.map(user => fromRaw(user)));
            });
        },
        get(username, callback) {
            db.onReady = () => con.query(queries.get, username, (err, res) => {
                callback(err, err ? null : fromRaw(res[0]));
            });
        },
        add(user, callback) {
            db.onReady = () => con.query(queries.add, toArray(user), (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        }
    };

    function fromRaw(user) {
        return {
            username:     user.username,
            passwordHash: user.password_hash,
            isAdmin:      !!user.is_admin
        };
    }
    function toArray(user) {
        return [ user.username, user.passwordHash, user.isAdmin ? 1 : 0 ];
    }
};