const tableName = 'campaign';
const columns = [ 'name',
                  'template',
                  'is_active',
                  'created_by',
                  'created_at',
                  'estimated_participants',
                  'url' ];
                      
module.exports = require('./crudBase').create(tableName, columns);