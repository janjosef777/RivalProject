const urljoin = require('url-join');

let db = null;

const tableName = 'card_result';
const columns = ['title', 'image', 'campaign', 'prize'];

const queries = {
    getDetailAll: 'SELECT r.*, p.name, p.value, p.quantity, p.id as prize_id, i.filename, i.width, i.height, i.id as image_id FROM card_result r LEFT JOIN prize p ON prize=p.id LEFT JOIN image i ON image=i.id WHERE campaign=?',
    deleteAll: 'DELETE FROM card_result WHERE campaign=?'
};

module.exports = Object.assign(require('./crudBase').create(tableName, columns), {
    init(database) {
        if(!db) {
            db = database;
        }
    },
    getDetailAll(campaignId, callback) {
        db.onReady = () => db.connection.query(queries.getDetailAll, campaignId, (err, res) => {
            res = err ? [] : res;
            res = res.map(cardResult => {
                if(cardResult.prize) {
                    cardResult.prize = {
                        id: cardResult.prize_id,
                        name: cardResult.name,
                        value: cardResult.value,
                        quantity: cardResult.quantity
                    };
                }
                if(cardResult.image) {
                    cardResult.image = {
                        id: cardResult.image_id,
                        filename: cardResult.filename,
                        path: urljoin(process.env.BASE_URL, 'uploads', filename),
                        width: cardResult.width,
                        height: cardResult.height
                    };
                }
                delete cardResult.prize_id;
                delete cardResult.name;
                delete cardResult.value;
                delete cardResult.quantity;
                delete cardResult.image_id;
                delete cardResult.filename;
                delete cardResult.width;
                delete cardResult.height;
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
    },
    addDetail(entry, callback) {
        if(entry.prize) {
            db.prizes.add(entry.prize, addResult);
        } else {
            addResult(null, 0);
        }
        function addResult(err, prizeId) {
            if(err) callback(err, null);
            else {
                if(prizeId)
                    entry.prize = prizeId;
                db.cardResults.add(entry, callback);
            }
        }
    },
    addDetailAll(campaignId, entries, callback) {
        let count = 0;
        let fails = 0;
        let firstErr = null;
        entries.forEach(cardRes => {
            cardRes.campaign = campaignId;
            db.cardResults.addDetail(cardRes, multiCallback);
        });
        function multiCallback(err) {
            count++
            if(err) {
                fails++
                if(!firstErr)
                    firstErr = err;
            }
            if(count >= entries.length) {
                callback(firstErr, {
                    count: count,
                    fails: fails,
                    successes: count - fails
                });
            }
        }
    },
    deleteDetailAll(campaignId, callback) {
        db.cardResults.getDetailAll(campaignId, (err, results) => {
            if(err || !results) callback(err, null);
            else {
                prizeIds = [];
                results.forEach(res => {
                    if(res.prize)
                        prizeIds.push(res.prize.id);
                });
                db.onReady = () => db.connection.query(queries.deleteAll, campaignId, (err, res) => {
                    if(err) callback(err, null);
                    else {
                        db.prizes.deleteAll(prizeIds, err => {
                            callback(err, err ? null : res.affectedRows);
                        });
                    }
                });
            }
        });
    },
    replaceDetailAll(campaignId, entries, callback) {
        db.cardResults.deleteDetailAll(campaignId, err => {
            if(err) callback(err, null);
            else {
                db.cardResults.addDetailAll(campaignId, entries, callback);
            }
        });
    }
});