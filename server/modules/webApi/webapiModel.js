/**
 * Created by hewenbiao on 2015/11/5.
 */
var mongoose = require('mongoose');

var webapiModel = {
    // �ο� apiInfo.json
    _id: Number
};

var webapiSchema = {
    getModel: function(dbName){
        var schema_webapi = new mongoose.Schema(webapiModel,{"collection": dbName});
        return mongoose.model(dbName, schema_webapi);
    }
};

module.exports = webapiSchema;