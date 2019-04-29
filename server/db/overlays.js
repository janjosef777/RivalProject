const tableName = 'overlay';
const columns = [
    'title',
    'image',
    'size'];

let db = null;
let connection = null;

module.exports = Object.assign(require('./crudBase').create(tableName, columns, {
    mapRead: mapRead,
    mapWrite: mapWrite
}))

function mapRead(overlay) {
    return {
        id: overlay.id,
        title: overlay.title,
        image: overlay.image,
        size: overlay.size,
    };
}
function mapWrite(overlay) {
    return {
        id: overlay.id,
        title: overlay.title,
        image: overlay.image,
        size: overlay.size,
    };
}