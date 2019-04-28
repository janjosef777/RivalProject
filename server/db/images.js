const tableName = 'image';
const columns = ['filename', 'width', 'height'];

module.exports = require('./crudBase').create(tableName, columns, {
    mapRead: image => Object.assign(image, {
        path: '/uploads/' + image.filename
    })
});