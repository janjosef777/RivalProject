const tableName = 'prize';
const columns = ['name', 'value', 'quantity'];

module.exports = require('./crudBase').create(tableName, columns);