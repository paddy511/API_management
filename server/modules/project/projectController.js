/**
 * Created by hewenbiao on 2015/11/5.
 */
var projectService = require('./projectService');

var projectController = {};

projectController.getProjectList = function(req, res){
    projectService.getProjectList()
        .then(function(result){
            console.log("project list: ");
            console.log(result);

            res.json(result);
            res.end();
        }, function(err){
            console.log("get project list failed.");
            console.log(err);

            res.status(500);
            res.json({errorCode: "get project list failed."});
            res.end();
        })
    ;
};

module.exports = projectController;