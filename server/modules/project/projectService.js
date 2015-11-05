/**
 * Created by hewenbiao on 2015/11/5.
 */
var projectModelService = require('./projectModelService');
var identityService = require('../identity/identityService');

var projectService = {};

projectService.getProjectFromReq = function(req){
    var _project = {
        name: req.body.name
    };
    return _project;
};

projectService.saveProject = function(project){
    return identityService.getIdentity()
        .then(function(result){

            console.log("get id to set project id");
            console.log(result);

            project._id = result;
            return project;
        })
        .then(projectModelService.saveProject);
};

projectService.getProjectList = function(){
    return projectModelService.getProjectList();
}

module.exports = projectService;