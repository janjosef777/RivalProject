const db = require('../db');

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

