var mysql = require('mysql');
var env = process.env;
var con = mysql.createConnection({
    host:     env.DB_HOST !== undefined ? env.DB_HOST : 'localhost',
    user:     env.DB_USER !== undefined ? env.DB_USER : 'user',
    password: env.DB_PASS !== undefined ? env.DB_PASS : 'password',
    database: env.DB_NAME !== undefined ? env.DB_NAME : 'database',
});
var ready = false;

require('./init')(con, function() {
    ready = true;
    console.log("Database ready");
});

module.exports = {
    get isReady() { return ready; }
};