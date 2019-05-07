const resultChooser = require('../../resultChooser');
const db = require('../../db');

const FRONTEND_BASE_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:3100' : null;

module.exports = {

    get: (req, res, next) => {
        // const parid = +req.params.parid;
        const campid = +req.params.campid;

        // if (!(parid > 0 && campid > 0)) {
        //     return //handleErr(null, res, 404);
        // }

        if (!(campid > 0)) {
            return //handleErr(null, res, 404);
        }

        // var cardResult = resultChooser.assignRandomCardResult(parid, campid);
        var cardResult = resultChooser.assignRandomCardResult(campid);

        if (cardResult) {
            resultChooser.getCardData(cardResult, res);
        }
        
        // var resultDetails = null;
        // function setResultDetails(value) {
        //     resultDetails = value;
        // };
        // db.cardResults.getDetail(cardresult, (error, result) => {
        //     setResultDetails(result)
        // });
        // console.log(resultDetails);

        // function callbackForResult(error, result) {
        //     resultDetails = result;
        //     var result = result;
        //     return function () { resultDetails = result}
        // }
        // (error, result) => (callbackForResult(error, result))()

        // db.cardResults.getDetail(cardresult, (error, result) => {
        //     resultTitle = result.title;
        //     overlaySrc = null;
        //     db.images.get(result.image, (error, overlayImg) => {
        //         overlaySrc = overlayImg.filename;
        //     });  
        //     campaign = result.campaign;
        //     console.log(overlaySrc);
        //     // db.campaigns.getDetail(cardresult, (error, result) => {
        //     //     title = result.title;
        //     //     console.log(title);
        //     // });    
        //     //overlaySrc = 
        //     //resultTitle = 
        //     //resultSrc = 
        // });
        //console.log(resultDetails);

        // var redirectURL = FRONTEND_BASE_URL + '/activecard/' + cardresult;

        // if (cardresult) {
        //     //res.send('hello');
        //     res.redirect( redirectURL );
        // }
    }
}