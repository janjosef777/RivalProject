const mysql = require('mysql');
const env = process.env;
const connection = env.NODE_ENV == 'development' ?
    mysql.createConnection({
        host:     env.DB_HOST !== undefined ? env.DB_HOST : 'localhost',
        user:     env.DB_USER !== undefined ? env.DB_USER : 'user',
        password: env.DB_PASS !== undefined ? env.DB_PASS : 'password',
        database: env.DB_NAME !== undefined ? env.DB_NAME : 'database',
    }) : 
    mysql.createConnection(
        env.CLEARDB_DATABASE_URL
    )

const queue1 = [];
const queue2 = [];
const states = {
    CREATED_TABLES: 1,
    READY: 2
};
let state = 0;

const crudBase = require('./crudBase');

const db = {
    get state() { return state; },
    set onCreatedTables(func) {
        if(typeof func !== 'function')
            throw TypeError('Function expected');

        if(state >= states.CREATED_TABLES)
            func();
        else
            queue1.push(func);
    },
    set onReady(func) {
        if(typeof func !== 'function')
            throw TypeError('Function expected');

        if(state >= states.READY)
            func();
        else
            queue2.push(func);
    },

    admin:       require('./admin'),
    campaigns:   require('./campaigns'),
    cardResults: require('./cardResults'),
    images:      require('./images'),
    prizes:      require('./prizes'),
    users:       require('./users'),
    templates:    require('./template')
};

crudBase.init(db, connection);
for(prop of Object.getOwnPropertyNames(db)) {
    if(db[prop] && db[prop].init)
        db[prop].init(db, connection);
}

module.exports = db;

require('./create/tables')(connection, function() {
    state = states.CREATED_TABLES;
    console.log("Created tables");
    for(var callback of queue1)
        callback();
    require('./create/admin')(function() {
        state = states.READY;
        console.log("Database ready");
        for(var callback of queue2)
            callback();
    });
});