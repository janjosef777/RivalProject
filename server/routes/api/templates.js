const db = require('../../db');

module.exports = {
    get: (req, res, next) => {
        const id = +req.params.id || 0;
        console.log(id)
        if (id <= 0)
            return handleErr(null, res, 404);
        db.templates.get(id, (err, template) => {
            if (err)
                return handleErr(err, res, 500);
            if (!template)
                return handleErr(null, res, 404);
            res.json({
                token: res.jwtToken,
                data: template
            });
        });
    },
    patch: (req, res, next) => {
        // return handleErr("campaigns.put not implemented", res, 501);
        const template = req.body;
        template.id = parseInt(req.params.id, 10);
        console.log(template);
        db.templates.update(template, (err, id) => {
            if (err)
                return handleErr(err, res, 500);
            if (!id)
                return handleErr(err, res, 404, "No campaign with id " + template.id);
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
        });

    },
    post: (req, res, next) => {
        const template = req.body
        console.log(template);
        db.templates.add(template, (err,id) => {
            if (err)
                return handleErr(err,res,500);
            const data = {
                id: id
            };
            res.json({
                token: res.jwtToken,
                data:data
            })
        })
    }
};
function handleErr(err, res, status, message) {
    if (err)
        console.log(err);
    if (res)
        res.status(status).send(message);
}

