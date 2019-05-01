const db = require('../../db');
module.exports = {
    getAll: (req, res, next) => {
        db.cardResults.getAll((err, cardResults) => {
            if(err)
                return handleErr(err, res, 500);
            res.json({
                token: res.jwtToken,
                data: cardResults
            });
        })
    },
    post: (req, res, next) => {
        const cardResult = req.body
        console.log(cardResult);
        db.cardResults.add(cardResults, (err,id) => {
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

