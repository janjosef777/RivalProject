let db = null;
let connection = null;

const tableName = 'card_result';
const columns = ['title', 'image', 'campaign', 'prize'];

const queries = {
    getDetailAll: 'SELECT r.*, p.name, p.value, p.quantity FROM card_result r LEFT JOIN prize p ON prize=p.id WHERE campaign=?'
};

module.exports = Object.assign(require('./crudBase').create(tableName, columns), {
    init(database, connect) {
        if(!connection) {
            db = database;
            connection = connect;
        }
    },
    getDetailAll(campaignId, callback) {
        db.onReady = () => connection.query(queries.getDetailAll, campaignId, (err, res) => {
            res = err ? [] : res;
            res = res.map(cardResult => {
                if(cardResult.prize) {
                    cardResult.prize = {
                        name: cardResult.name,
                        value: cardResult.value,
                        quantity: cardResult.quantity
                    };
                }
                delete cardResult.name;
                delete cardResult.value;
                delete cardResult.quantity;
                return cardResult;
            })
            callback(err, res);
        });
    },
    getDetail(id, callback) {
        db.cardResults.get(id, (err, cardResult) => {
            if(err || !cardResult) {
                callback(err, null);
            } else if(cardResult.prize) {
                db.prizes.get(cardResult.prize, (err, prize) => {
                    cardResult.prize = prize;
                    callback(err, err || !prize ? null : cardResult);
                })
            } else {
                cardResult.prize = null;
                callback(null, cardResult);
            }
        })
    }
});