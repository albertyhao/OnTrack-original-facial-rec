var mongoose = require('mongoose');

var model = mongoose.model('browsingHistory', new mongoose.Schema({
  protocol: {
    type: String
  },
  domain: {
    type: String
  },
  path: {
    type: String,
  },
  subdomain: {
    type: Date
  },
  host: {
    type: String
  },
  tld: {
      type: String
  },
  parentDomain: {
      type: String
  }

})
);

