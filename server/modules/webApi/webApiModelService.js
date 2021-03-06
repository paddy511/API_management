/**
 * Created by hewenbiao on 2015/11/5.
 */
var webApiModel = require('./webApiModel');
var Promise = require("mpromise");
var webApiModelService = {};

var dbModel = {};

webApiModelService.getVersionList = function(dbName){
    if(!dbModel[dbName]){
        dbModel[dbName] = webApiModel.getModel(dbName);
    }

    return dbModel[dbName].find({},{_id: 1, version: 1}).exec(function(err){
        if(err){
            console.log("get version list failed: ");
            console.log(err);
        }
    });
};

webApiModelService.getWebApiDetail = function(dbName, version){
    if(!dbModel[dbName]){
        dbModel[dbName] = webApiModel.getModel(dbName);
    }

    return dbModel[dbName].findOne({version: version}).exec(function(err){
        if(err){
            console.log("get version list failed: ");
            console.log(err);
        }
    });
}

module.exports = webApiModelService;

