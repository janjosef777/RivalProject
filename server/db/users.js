module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM login_user',
        get: 'SELECT * FROM login_user WHERE username=?',
        add: 'INSERT INTO login_user (username, password_hash, is_admin) VALUES (?,?,0)',
        delete: 'DELETE FROM login_user WHERE username=?'
    };
    return {
        getAll(callback) {
            db.onReady = () => con.query(queries.getAll, (err, res) => {
                callback(err, err ? [] : res.map(user => fromRaw(user)));
            });
        },
        get(username, callback) {
            db.onReady = () => con.query(queries.get, username, (err, res) => {
                callback(err, res[0] ? fromRaw(res[0]) : null);
            });
        },
        add(user, callback) {
            db.onReady = () => con.query(queries.add, toArray(user), (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        },
        delete(username, callback) {
            db.onReady = () => con.query(queries.delete, username, (err, res) => {
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
        return [ user.username, user.passwordHash ];
    }
};