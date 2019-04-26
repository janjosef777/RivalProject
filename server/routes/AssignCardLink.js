const resultChooser = require('../resultChooser');

const FRONTEND_BASE_URL = process.env.NODE_ENV == 'development' ? 'localhost:3100' : null;

module.exports = {

    get: (req, res, next) => {
        const parid = +req.params.parid;
        const campid = +req.params.campid;

        if (!(parid > 0 && campid > 0)) {
            return handleErr(null, res, 404);
        }

        var cardresult = resultChooser(parid, campid);

        var redirectURL = FRONTEND_BASE_URL + '/activecard?result=' + cardresult;

        if (resid) {
            res.redirect( redirectURL );
        }
    }
}