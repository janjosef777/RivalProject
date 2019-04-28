const tableName = 'campaign';
const columns = [ 'name',
                  'template',
                  'is_active',
                  'created_by',
                  'created_at',
                  'estimated_participants',
                  'url' ];

let db = null;
let connection = null;

module.exports = Object.assign(require('./crudBase').create(tableName, columns, {
    mapRead: mapRead,
    mapWrite: mapWrite
}), {
    init(database, connect) {
        if(!connection) {
            db = database;
            connection = connect;
        }
    },
    getDetail(id, callback) {
        db.campaigns.get(id, (err, campaign) => {
            if(err || !campaign) {
                callback(err, null);
            } else {
                db.cardResults.getDetailAll(id, (err, cardResults) => {
                    campaign.cardResults = cardResults;
                    callback(err, err ? null : campaign);
                });
            }
        });
    }
});

function mapRead(campaign) {
    return {
        id: campaign.id,
        name: campaign.name,
        template: campaign.template,
        isActive: !!campaign.is_active,
        createdBy: campaign.created_by,
        createdAt: campaign.created_at,
        estimatedParticipants: campaign.estimated_participants,
        url: campaign.url,
        hasPrizes: campaign.estimated_participants > 0
    };
}
function mapWrite(campaign) {
    if(campaign.hasPrizes && !campaign.estimatedParticipants) {
        throw new Error("Campaign with prizes needs estimated participants");
    }
    return {
        name: campaign.name,
        template: campaign.template,
        is_active: campaign.isActive ? 1 : 0,
        created_by: campaign.createdBy,
        created_at: campaign.createdAt || new Date(),
        estimated_participants: campaign.hasPrizes && campaign.estimatedParticipants || 0,
        url: campaign.url
    };
}