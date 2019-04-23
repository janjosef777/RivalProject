module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM card_result',
        get: 'SELECT * FROM card_result WHERE id=?',
        add: 'INSERT INTO card_result (title, image, campaign, prize, quantity) VALUES (?,?,?,?,?)',
        delete: 'DELETE FROM card_result WHERE id=?',
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
        add(cardRes, callback) {
            db.onReady = () => con.query(queries.add, toArray(cardRes), (err, res) => {
                callback(err, err ? 0 : res.insertId);
            });
        },
        delete(id, callback) {
            db.onReady = () => con.query(queries.delete, id, (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        }
    };

    function toArray(cardRes) {
        return [ cardRes.title, cardRes.image, cardRes.campaign, cardRes.prize, cardRes.quantity ];
    }
};