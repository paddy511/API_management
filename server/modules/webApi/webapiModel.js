/**
 * Created by hewenbiao on 2015/11/5.
 */
var mongoose = require('mongoose');

var webapiModel = {
    // �ο� apiInfo.json
};

var webapiSchema = mongoose.Schema(webapiModel);

module.exports = mongoose.model('identity', webapiSchema);