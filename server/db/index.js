const mysql = require('mysql');
const env = process.env;
const connection = mysql.createConnection({
    host:     env.DB_HOST !== undefined ? env.DB_HOST : 'localhost',
    user:     env.DB_USER !== undefined ? env.DB_USER : 'user',
    password: env.DB_PASS !== undefined ? env.DB_PASS : 'password',
    database: env.DB_NAME !== undefined ? env.DB_NAME : 'database',
});
const queue = [];
let ready = false;

require('./create')(connection, function() {
    ready = true;
    console.log("Database ready");
    for(var callback of queue)
        callback();
});
const crudBase = require('./crudBase');

const db = {
    get isReady() { return ready; },
    set onReady(func) {
        if(typeof func !== 'function')
            throw TypeError('Function expected');

        if(ready)
            func();
        else
            queue.push(func);
    },

    admin:       require('./admin'),
    campaigns:   require('./campaigns'),
    cardResults: require('./cardResults'),
    images:      require('./images'),
    prizes:      require('./prizes'),
    users:       require('./users'),
};

crudBase.init(db, connection);
for(prop of Object.getOwnPropertyNames(db)) {
    if(db[prop] && db[prop].init)
        db[prop].init(db, connection);
}

module.exports = db;