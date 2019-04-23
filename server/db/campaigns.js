module.exports = function(con, db) {

    const queries = {
        getAll: 'SELECT * FROM campaign',
        get: 'SELECT * FROM campaign WHERE id=?',
        add: 'INSERT INTO campaign (name, template, start_date, end_date, url) VALUES (?,?,?,?,?)',
        delete: 'DELETE FROM campaign WHERE id=?',
    };
    return {
        getAll(callback) {
            db.onReady = () => con.query(queries.getAll, (err, res) => {
                callback(err, err ? [] : res);
            });
        },
        get(id, callback) {
            db.onReady = () => con.query(queries.get, id, (err, res) => {
                callback(err, res[0] ? null : fromRaw(res[0]));
            });
        },
        add(campaign, callback) {
            db.onReady = () => con.query(queries.add, toArray(campaign), (err, res) => {
                callback(err, err ? 0 : res.insertId);
            });
        },
        delete(id, callback) {
            db.onReady = () => con.query(queries.delete, id, (err, res) => {
                callback(err, err ? false : res.affectedRows > 0);
            });
        }
    };

    function fromRaw(campaign) {
        return {
            name:      campaign.name,
            startDate: campaign.start_date,
            endDate:   campaign.end_date,
            url:       campaign.url
        };
    }
    function toArray(campaign) {
        return [ campaign.name, campaign.template, campaign.startDate, campaign.endDate, campaign.url ];
    }
};