const resultChooser = require('../resultChooser/');
const db = require('../db');

const FRONTEND_BASE_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:3100' : null;

module.exports = {

    get: (req, res, next) => {
        const parid = +req.params.parid;
        const campid = +req.params.campid;

        if (!(parid > 0 && campid > 0)) {
            return //handleErr(null, res, 404);
        }

        var cardresult = resultChooser.assignRandomCardResult(parid, campid);
        
        var resultDetails = null;

        function callbackForResult(error, result) {
            if (result)
            var result = result;
            return function () {return result}
        }

        db.cardResults.getDetail(cardresult, (error, result) => (callbackForResult(error, result))() );
        resultDetails = (callbackForResult())();
        console.log(resultDetails);

        //console.log(resultDetails);

        var redirectURL = FRONTEND_BASE_URL + '/activecard/' + cardresult;

        if (cardresult) {
            //res.send('hello');
            res.redirect( redirectURL );
        }
    }
}