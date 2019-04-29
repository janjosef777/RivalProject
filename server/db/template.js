const tableName = 'overlay';
const columns = [ 'title',
                  'images',
                  'size'
                ];

let db = null;
let connection = null;

module.exports = Object.assign(require('./crudBase').create(tableName, columns, {
    mapRead: mapRead,
    mapWrite: mapWrite
}), {
    init(database, connect) {
        if(!connection) {
            db = database;
            connection = connect;
        }
    },
    getDetail(id, callback) {
        db.overlay.get(id, (err, overlay) => {
            if(err || !overlay) {
                callback(err, null);
            } else {
                db.cardResults.getDetailAll(id, (err, cardResults) => {
                    overlay.cardResults = cardResults;
                    callback(err, err ? null : overlay);
                });
            }
        });
    }
});

function mapRead(overlay) {
    return {
        id: overlay.id,
        title: overlay.title,
        images: overlay.images,
        size: overlay.images
    };
}
function mapWrite(overlay) {
    if(overlay.hasPrizes && !overlay.estimatedParticipants) {
        throw new Error("");
    }
    return {
        name: overlay.name,
        title: overlay.title,
        images: overlay.images,
        size: overlay.images
    };
}