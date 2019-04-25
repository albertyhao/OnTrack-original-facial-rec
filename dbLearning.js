var mongoose = require("mongoose");
var timeModel = require("./schemas/time.js").getModel();

const dbUri = 'mongodb://heroku_qjgzdh28:pu9dvkmtftdmbqqqpq7le4v8dh@ds161285.mlab.com:61285/heroku_qjgzdh28';

mongoose.connect(dbUri, createKeywordPareto);

function createKeywordPareto() {
  timeModel.find({}).select("keywords").exec((err, data) => {
    const keywords = k.keywords[0];
  })buttbuttbuttbuttbuttbutt :D hi egg buttnut lolol
}
