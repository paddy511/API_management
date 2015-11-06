/**
 * Created by hewenbiao on 2015/11/6.
 */

var webApiService = require('./webApiService');
var projectService = require('../project/projectService');
var webApiController = {};

webApiController.getVersionList = function(req, res){

    projectService.getProjectName({_id: req.query.projectid})
        .then(function(result){
            console.log("get project name by id: ");
            console.log(result.name)
            return result.name;
        })
        .then(webApiService.getVersionList)
        .then(function(result){
            console.log("get version list by project name: ");
            console.log(result);

            res.json(result);
            res.end();
        }, function(err){
            console.log(err);
            res.status(500);
            res.json({errorCode: "get version list failed."});
            res.end();
        })
    ;
};

webApiController.getWebApiDetail = function(req, res){
    projectService.getProjectName({_id: req.query.projectid})
        .then(function(result){
            console.log("get project name by id: ");
            console.log(result.name);
            return webApiService.getWebApiDetail(result.name, req.query.version);
        })
        .then(function(result){
            console.log("get webapi detail success: ");
            console.log(result);

            res.json(result);
            res.end();
        }, function(err){
            console.log(err);
            res.status(500);
            res.json({errorCode: "get webapi detail failed."});
            res.end();
        })
    ;
};

module.exports = webApiController;