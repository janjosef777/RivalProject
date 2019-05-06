const mysql = require('mysql');
const env = process.env;

const connectionValues = env.NODE_ENV == 'development' ? 
    {
        host: env.DB_HOST !== undefined ? env.DB_HOST : 'localhost',
        user: env.DB_USER !== undefined ? env.DB_USER : 'user',
        password: env.DB_PASS !== undefined ? env.DB_PASS : 'password',
        database: env.DB_NAME !== undefined ? env.DB_NAME : 'database'
    } : env.CLEARDB_DATABASE_URL; 
    // {
    //     host: env.AWS_HOST !== undefined ? env.DB_HOST : 'localhost',
    //     user: env.AWS_USER !== undefined ? env.DB_USER : 'user',
    //     password: env.AWS_PASSWORD !== undefined ? env.DB_PASS : 'password',
    //     port: env.AWS_PORT !== undefined ? env.DB_NAME : '3306',
    //     database: env.AWS_DATABASE !== undefined ? env.DB_NAME : 'database'
    // }   

const queue1 = []; // On created tables
const queue2 = []; // On ready
const states = {
    CREATED_TABLES: 1,
    READY: 2,
    ENDING: 3,
    ENDED: 4
};
let state = 0;
let connection = null;

const crudBase = require('./crudBase');

const db = {
    get connection() { return connection; },
    connect(callback) {
        if(connection) {
            this.disconnect(err => {
                if(err) return callback(err);
                this.connect(callback);
            });
        } else {
            console.log('Connect db...');
            connection = mysql.createConnection( connectionValues );
            connection.connect(err => {
                if(state >= states.ENDING)
                    state = states.READY;
                callback(err);
            });
        }
    },
    disconnect(callback = null) {
        if(state < states.ENDING) {
            state = states.ENDING;
            console.log('Disconnect db...')
            connection.end(err => {
                if(callback)
                    callback(err);
                else if(err)
                    console.log(err);
                connection = null;
                state = states.ENDED;
            });
        }
    },

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
    templates:   require('./template')
};

crudBase.init(db);
for(prop of Object.getOwnPropertyNames(db)) {
    if(db[prop] && db[prop].init)
        db[prop].init(db);
}

module.exports = db;

db.connect(err => {
    if(err)
        return console.log(err);
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
            db.disconnect();
        });
    });
});