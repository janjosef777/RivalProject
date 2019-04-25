let db = null;
let connection = null;

const tableName = 'card_result';
const columns = ['title', 'image', 'campaign', 'prize'];

const queries = {
    getAllInCampaign: 'SELECT * FROM card_result WHERE campaign=?'
};

module.exports = Object.assign(require('./crudBase').create(tableName, columns), {
    init(database, connect) {
        if(!connection) {
            db = database;
            connection = connect;
        }
    },
    getAllInCampaign(campaignId, callback) {
        db.onReady = () => connection.query(queries.getAllInCampaign, campaignId, (err, res) => {
            callback(err, err ? [] : res);
        });
    }
});