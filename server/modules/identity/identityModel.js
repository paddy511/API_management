/**
 * Created by hewenbiao on 2015/11/4.
 */
var mongoose = require('mongoose');

var identityModule = {
    "min_id": Number
};

var identitySchema = mongoose.Schema(identityModule);

module.exports = mongoose.model('identity', identitySchema);