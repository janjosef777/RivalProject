const db = require('../db');
const btoa = require('btoa');
//const cardresult = require('../db');

const FRONTEND_BASE_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:3100' : null;
const IMAGES_PATH = '/uploads/'

module.exports = {

    assignRandomCardResult(campid) {

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

        db.query('SELECT * FROM card_result;', (error, cardResults, fields) => {
           console.log(cardResults);
        });

        for (var i = cardResults.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = cardResults[i];
            cardResults[i] = cardResults[j];
            cardResults[j] = temp;
        }

        return 1;
    },
    getCardData(cardResultId, res) {

        var responseObject = { title: null, overlaySrc: null, resultTitle: null, resultSrc: null};

        db.cardResults.getDetail(cardResultId, (error, result) => {
            responseObject.resultTitle = result.title;
            resultImageId = result.image;
            campaignId = result.campaign;

            db.images.get(resultImageId, (error, image) => {
                responseObject.resultSrc = IMAGES_PATH + image.filename;

                db.campaigns.getDetail(campaignId, (error, campaign) => {
                    overlayId = campaign.template;
                    
                    //db.query('SELECT * FROM overlay WHERE id = 1;', (error, overlay, fields) => {
                    //    console.log(overlay);
                    //});
                    // db.overlays.getDetail(overlayId, (error, overlay) => {
                    //     console.log(error);
                        //responseObject.title = overlay.title;
                        //console.log(responseObject);
                    //});

                    responseObject.title = 'Thanks for Participating!';
                    responseObject.overlaySrc = IMAGES_PATH + 'coffee-art-wallpaper-desktop-background-For-Wallpaper-Idea-5.jpeg';

                    var redirectURL = FRONTEND_BASE_URL 
                        + '/activecard/' 
                        + btoa(responseObject.title) + '/'
                        + btoa(responseObject.overlaySrc) + '/'
                        + btoa(responseObject.resultTitle) + '/'
                        + btoa(responseObject.resultSrc)

                    console.log(responseObject);
                    console.log(redirectURL);

                    res.redirect(redirectURL);
                });
                
            });
        });
    }

}