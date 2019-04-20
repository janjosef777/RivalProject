module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM image',
        get: 'SELECT * FROM image WHERE id=?',
        getByFilename: 'SELECT * FROM image WHERE filename=?',
        add: 'INSERT INTO image (filename, width, height) VALUES (?,?,?)',
        delete: 'DELETE FROM image WHERE id=?',
        deleteByFilename: 'DELETE FROM image WHERE filename=?',
    };
    return {
        getAll(callback) {
            db.onReady = () => con.query(queries.getAll, (err, res) => {
                callback(err, err ? [] : res);
            });
        },
        get(id, callback) {
            db.onReady = () => con.query(queries.getById, id, (err, res) => {
                callback(err, err ? null : res[0]);
            });
        },
        getByFilename(filename, callback) {
            db.onReady = () => con.query(queries.getByFilename, filename, (err, res) => {
                callback(err, err ? null : res[0]);
            });
        },
        add(image, callback) {
            db.onReady = () => con.query(queries.add, toArray(image), (err, res) => {
                callback(err, err ? 0 : res.insertId);
            });
        },
        delete(id, callback) {
            db.onReady = () => con.query(queries.delete, id, (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        },
        deleteByFilename(filename, callback) {
            db.onReady = () => con.query(queries.deleteByFilename, filename, (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        }
    };

    function toArray(image) {
        return [ image.filename, image.width, image.height ];
    }
};