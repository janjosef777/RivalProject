const tableName = 'image';
const columns = ['filename', 'width', 'height'];
const urls = require('../urls');
console.log(urls.baseUrl);
module.exports = require('./crudBase').create(tableName, columns, {
    mapRead: image => Object.assign(image, {
        path: urls.baseUrl + '/uploads/' + image.filename
    })
});