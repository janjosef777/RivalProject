const tableName = 'overlay';
const columns = ['title',
    'image',
    'size'
];

let db = null;

module.exports = Object.assign(require('./crudBase').create(tableName, columns, {
    mapRead: mapRead,
    mapWrite: mapWrite
}), {
        init(database) {
            if (!db)
                db = database;
        },
        getDetail(id, callback) {
            db.template.get(id, (err, template) => {
                if (err || !template) {
                    callback(err, null);
                } else {
                    callback(err, err ? null : template)
                }
            });
        }
    });

function mapRead(template) {
    return {
        id: template.id,
        title: template.title,
        image: template.image,
        size: template.size
    };
}
function mapWrite(template) {
    return {
        id: template.id,
        title: template.title,
        image: template.image,
        size: template.size
    };
}