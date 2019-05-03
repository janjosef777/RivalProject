const mysql = require('mysql');
const env = process.env;

const connectionValues = env.NODE_ENV == 'development' ? 
    {
        host: env.DB_HOST !== undefined ? env.DB_HOST : 'localhost',
        user: env.DB_USER !== undefined ? env.DB_USER : 'user',
        password: env.DB_PASS !== undefined ? env.DB_PASS : 'password',
        database: env.DB_NAME !== undefined ? env.DB_NAME : 'database'
    } :
    env.CLEARDB_DATABASE_URL;

const connection = mysql.createConnection(connectionValues);

function nurtureConnection() {
    connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            nurtureConnection();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

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
    templates:    require('./template'),

    nurtureConnection: nurtureConnection
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