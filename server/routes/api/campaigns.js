const db = require('../../db');

module.exports = {
    getAll: (req, res, next) => {
        db.connect(err => {
            if(err) return handleErr(err, res, 500);
            db.campaigns.getAll((err, campaigns) => {
                if (err)
                    return handleErr(err, res, 500);
                res.json({
                    token: res.jwtToken,
                    data: campaigns
                });
                db.disconnect();
            });
        });
    },
    get: (req, res, next) => {
        console.log('Woooooo');
        const id = +req.params.id || 0;
        if (id <= 0)
            return handleErr(null, res, 404);
        db.connect(err => {
            if(err) return handleErr(err, res, 500);
            db.campaigns.getDetail(id, (err, campaign) => {
                if (err)
                    return handleErr(err, res, 500);
                if (!campaign)
                    return handleErr(null, res, 404);
                res.json({
                    token: res.jwtToken,
                    data: campaign
                });
                db.disconnect();
            });
        });
    },
    post: (req, res, next) => {
        const campaign = req.body;
        campaign.createdBy = res.jwtUser;
        console.log(campaign);
        db.connect(err => {
            if(err) return handleErr(err, res, 500);
            db.overlays.add({title: 'Thanks for participating!'}, (err, overlayId) => {
                if(err) return handleErr(err, res, 500);
                campaign.template = overlayId;
                db.campaigns.add(campaign, (err, id) => {
                    if (err)
                        return handleErr(err, res, 500);
                    const data = {
                        id: id
                    };
    
                    const cardResults = req.body.cardResults;
    
                    if (cardResults && !Array.isArray(cardResults))
                        return handleErr(null, res, 400, "Card results needs to be an array");
    
                    processCardResults(id, cardResults, cardResultsData => {
                        if (cardResultsData)
                            data.cardResults = cardResultsData;
    
                        res.json({
                            token: res.jwtToken,
                            data: data
                        });
                        db.disconnect();
                    })
                });
            });
        });
    },
    patch: (req, res, next) => {
        const campaign = req.body;
        campaign.id = +req.params.id;
        console.log(campaign);
        db.connect(err => {
            if(err) return handleErr(err, res, 500);
            db.campaigns.updateDetail(campaign, (err, id) => {
                if (err)
                    return handleErr(err, res, 500);
                if (!id)
                    return handleErr(err, res, 404, "No campaign with id " + campaign.id);
                const data = {
                    id: id
                };

                // const cardResults = req.body.cardResults;

                // if (cardResults && !Array.isArray(cardResults))
                //     return handleErr(null, res, 400, "Card results needs to be an array");

                // processCardResults(id, cardResults,  'update', cardResultsData => {

                //     if (cardResultsData)
                //         data.cardResults = cardResultsData;
                res.json({
                    token: res.jwtToken,
                    data: data
                });
                db.disconnect();
            });
        });
    },
    delete: (req, res, next) => {
        const id = +req.params.id || 0;
        if (id <= 0)
            return handleErr(null, res, 404);
        db.connect(err => {
            if(err) return handleErr(err, res, 500);
            db.campaigns.delete(id, (err, success) => {
                if (err)
                    return handleErr(err, res, 500);
                res.json({
                    token: res.jwtToken,
                    data: { id: id, deleted: success }
                });
                db.disconnect();
            });
        });
    }
};

function handleErr(err, res, status, message) {
    if (err)
        console.log(err);
    if (res)
        res.status(status).send(message);
}

function processCardResults(campaignId, cardResults, callback) {

    if (!cardResults)
        return callback(null);

    const data = {
        processed: 0,
        successes: 0
    };

    cardResults.forEach(item => {
        if (typeof item !== 'object') {
            // Invalid
            next(null, false);
        } else {
            item.campaign = campaignId;
            db.cardResults.add(item, next)
        }
    });

    function next(err, result) {
        if (err)
            console.log(err);
        data.processed++;
        data.successes += !err && !!result;
        if (data.processed >= cardResults.length) {
            callback(data);
        }
    }
}