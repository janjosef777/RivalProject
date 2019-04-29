const db = require('../db');
//const cardresult = require('../db');

const FRONTEND_BASE_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:3100' : null;

module.exports = {

    assignRandomCardResult(parid, campid) {

        //db.cardResults.getDetail(1, (error, result) => console.log(result));

        //if a result has already been assigned then return the cardresult id

        //else assign a result and return the cardresult id

        // var result = {
        //     id: 1,
        //     title: 'you won an aloe plant!',
        //     image: 1,
        //     campaign: 1,
        //     prize: 1
        // }

        return 1;
    },
    sendCardData(cardResultId) {

        //var redirectURL = FRONTEND_BASE_URL + '/activecard/' + cardresult;
        var responseObject = { title: null, overlaySrc: null, resultTitle: null, resultSrc: null};

        db.cardResults.getDetail(cardResultId, (error, result) => {
            responseObject.resultTitle = result.title;
            resultImageId = result.image;
            campaignId = result.campaign;

            db.images.get(resultImageId, (error, image) => {
                responseObject.resultSrc = image.filename;

                db.campaigns.getDetail(campaignId, (error, campaign) =>{
                    overlayId = campaign.template;
                    
                });
                console.log(responseObject);
            });
        });
    }

}