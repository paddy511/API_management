/**
 * Created by hewenbiao on 2015/11/5.
 */
var webApiModel = require('./webApiModel');
var Promise = require("mpromise");
var webApiModelService = {};

webApiModelService.getVersionList = function(projectName){
    return webApiModel.getModel(projectName).find({},{_id: 1, version: 1}).exec(function(err){
        if(err){
            console.log("get version list failed: ");
            console.log(err);
        }
    });
}

module.exports = webApiModelService;

