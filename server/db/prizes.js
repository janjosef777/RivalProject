module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM prize',
        get: 'SELECT * FROM prize WHERE id=?',
        add: 'INSERT INTO prize (name, value, quantity) VALUES (?,?,?)',
        delete: 'DELETE FROM prize WHERE id=?',
    };
    return {
        getAll(callback) {
            db.onReady = () => con.query(queries.getAll, (err, res) => {
                callback(err, err ? [] : res);
            });
        },
        get(id, callback) {
            db.onReady = () => con.query(queries.get, id, (err, res) => {
                callback(err, err ? null : res[0]);
            });
        },
        add(prize, callback) {
            db.onReady = () => con.query(queries.add, toArray(prize), (err, res) => {
                callback(err, err ? 0 : res.insertId);
            });
        },
        delete(id, callback) {
            db.onReady = () => con.query(queries.delete, id, (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        }
    };

    function toArray(prize) {
        return [ prize.name, prize.value, prize.quantity ];
    }
};