let connection = null;
let db = null;

module.exports = {
    create(tableName, columns, mapWrite, mapRead) {
        const queries = {
            getAll: 'SELECT * FROM ' + tableName,
            get: 'SELECT * FROM ' + tableName + ' WHERE id=?',
            add: 'INSERT INTO ' + tableName + ' (' + columns.join(',') + ') '
                + 'VALUES (' + columns.map(() => '?').join(',') + ')',
            replace: 'INSERT INTO ' + tableName + ' (' + columns.join(',') + ') '
                    + 'VALUES (' + columns.map(() => '?').join(',') + ')',
            delete: 'DELETE FROM ' + tableName + ' WHERE id=?',
        };

        return {
            getAll(callback) {
                db.onReady = () => connection.query(queries.getAll, (err, res) => {
                    res = err ? [] : res;
                    res = mapRead ? res.map(row => mapRead(row)) : res;
                    callback(err, res);
                });
            },
            get(id, callback) {
                db.onReady = () => connection.query(queries.get, id, (err, res) => {
                    res = err || !res[0] ? null : res;
                    res = res && mapRead ? mapRead(res) : res;
                    callback(err, res);
                });
            },
            add(entry, callback) {
                entry = mapWrite ? mapWrite(entry) : entry;
                db.onReady = () => connection.query(queries.add, toArray(entry), (err, res) => {
                    callback(err, err ? 0 : res.insertId);
                });
            },
            replace(entry, callback) {
                entry = mapWrite ? mapWrite(entry) : entry;
                db.onReady = () => connection.query(queries.replace, toArray(entry), (err, res) => {
                    callback(err, err ? 0 : res.insertId);
                });
            },
            delete(id, callback) {
                db.onReady = () => connection.query(queries.delete, id, (err, res) => {
                    callback(err, err ? false : res.affectedRows > 0);
                });
            }
        };
    
        function toArray(entry) {
            return columns.map(col => entry[col]);
        }
    },
    init(database, connect) {
        if(!connection) {
            db = database;
            connection = connect;
        }
    }
}