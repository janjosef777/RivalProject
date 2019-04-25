let db = null;
let con = null;

const queries = {
    get:      'SELECT * FROM login_user WHERE is_admin=1',
    assign:   'UPDATE login_user SET is_admin=1 WHERE username=?',
    unassign: 'UPDATE login_user SET is_admin=0',
    delete:   'DELETE FROM login_user WHERE is_admin=1'
};

module.exports = {
    init(database, connect) {
        if(!con) {
            db = database;
            con = connect;
        }
    },
    get(callback) {
        db.onReady = () => con.query(queries.get, username, (err, res) => {
            const admin = (res && res.length) ? res[0] : {};
            callback(err, err ? null : admin.username);
        });
    },
    assign(username, callback) {
        this.unassign(err => {
            if(err)
                callback(err, null);
            else {
                db.onReady = () => con.query(queries.assign, username, (err, res) => {
                    callback(err, err ? false : res.affectedRows > 0);
                });
            }
        });
    },
    unassign(callback) {
        db.onReady = () => con.query(queries.unassign, (err, res) => {
            callback(err, err ? null : res.affectedRows);
        });
    },
    delete(callback) {
        db.onReady = () => con.query(queries.delete, (err, res) => {
            callback(err, err ? null : res.affectedRows);
        });
    }
};