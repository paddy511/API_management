/**
 * Created by hewenbiao on 2015/11/5.
 */
var webApiModel = require('./webApiModel');
var Promise = require("mpromise");
var webApiModelService = {};

webApiModelService.getVersionList = function(dbName){
    return webApiModel.getModel(dbName).find({},{_id: 1, version: 1}).exec(function(err){
        if(err){
            console.log("get version list failed: ");
            console.log(err);
        }
    });
};

webApiModelService.getWebApiDetail = function(dbName, versionId){
    return webApiModel.getModel(dbName).find({_id: versionId}).exec(function(err){
        if(err){
            console.log("get version list failed: ");
            console.log(err);
        }
    });
}

module.exports = webApiModelService;

