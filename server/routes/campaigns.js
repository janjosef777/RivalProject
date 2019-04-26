const db = require('../db');

module.exports = {
    getAll: (req, res, next) => {
        db.campaigns.getAll((err, campaigns) => {
            if(err)
                return handleErr(err, res, 500);
            res.json({
                token: res.jwtToken,
                data: campaigns
            });
        });
    },
    get: (req, res, next) => {
        const id = +req.params.id || 0;
        if(id <= 0)
            return handleErr(null, res, 404);
        db.campaigns.get(id, (err, campaign) => {
            if(err)
                return handleErr(err, res, 500);
            if(!campaign)
                return handleErr(null, res, 404);
            res.json({
                token: res.jwtToken,
                data: campaign
            });
        });
    },
    post: (req, res, next) => {
        const startDate = req.body.startDate ? new Date(req.body.startDate) : null;
        const endDate   = req.body.endDate   ? new Date(req.body.endDate  ) : null;

        if(startDate || endDate) {
            if(startDate && isNaN(startDate.getTime()))
                return handleErr(null, res, 400, "Invalid start date");
            if(endDate && isNaN(endDate.getTime()))
                return handleErr(null, res, 400, "Invalid end date");
            if(startDate && endDate && startDate > endDate)
                return handleErr(null, res, 400, "Invalid dates");
        }

        const campaign = {
            name:      req.body.name || null,
            template:  req.body.template || null,
            startDate: startDate ? startDate.toISOString() : null,
            endDate:   endDate   ? endDate  .toISOString() : null,
            url:       req.body.url || null
        };

        db.campaigns.add(campaign, (err, id) => {
            if(err)
                return handleErr(err, res, 500);
            const data = {
                id: id
            };

            const cardResults = req.body.cardResults;

            if(cardResults && !Array.isArray(cardResults))
                return handleErr(null, res, 400, "Card results needs to be an array");
    
            processCardResults(id, cardResults, cardResultsData => {
                if(cardResultsData)
                    data.cardResults = cardResultsData;

                res.json({
                    token: res.jwtToken,
                    data: data
                });
            })
        });
    },
    put: (req, res, next) => {
        return handleErr("campaigns.put not implemented", res, 501);
    },
    delete: (req, res, next) => {
        const id = +req.params.id || 0;
        if(id <= 0)
            return handleErr(null, res, 404);
        db.campaigns.delete(id, (err, success) => {
            if(err)
                return handleErr(err, res, 500);
            res.json({
                token: res.jwtToken,
                data: { id: id, deleted: success }
            });
        });
    }
};

function handleErr(err, res, status, message) {
    if(err)
        console.log(err);
    if(res)
        res.status(status).send(message);
}

function processCardResults(campaignId, cardResults, callback) {

    if(!cardResults)
        return callback(null);

    const data = {
        processed: 0,
        successes: 0
    };

    cardResults.forEach(item => {
        if(typeof item !== 'object') {
            // Invalid
            next(null, false);
        } else {
            item.campaign = campaignId;
            db.cardResults.add(item, next)
        }
    });

    function next(err, result) {
        if(err)
            console.log(err);
        data.processed++;
        data.successes += !err && !!result;
        if(data.processed >= cardResults.length) {
            callback(data);
        }
    }
}