/**
 * Created by hewenbiao on 2015/11/5.
 */
var mongoose = require('mongoose');

var webapiModel = {
    // ²Î¿¼ apiInfo.json
    _id: Number
};

var webapiSchema = {
    getModel: function(projectName){
        var schema_webapi = new mongoose.Schema(webapiModel,{"collection": projectName});
        return mongoose.model(projectName, schema_webapi);
    }
};

module.exports = webapiSchema;