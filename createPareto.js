var mongoose = require('mongoose');
var timeModel = require('./schemas/time.js').getModel();


mongoose.connect(dbUri, createKeywordPareto);

function createKeywordPareto() {

    timeModel.find({}).select('keywords').exec((err, data) => {
        data.forEach(k => {
            const keywords = k.keywords[0];

        })
    });
}