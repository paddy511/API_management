/**
 * Created by hewenbiao on 2015/11/5.
 */
var projectModelService = require('./projectModelService');
var identityService = require('../identity/identityService');

var projectService = {};


projectService.saveProject = function(projectName){
    return identityService.getIdentity()
        .then(function(result){

            console.log("get id to set project id");
            console.log(result);

            var project = {};
            project._id = result;
            project.name = projectName;
            return project;
        })
        .then(projectModelService.saveProject);
};

projectService.getProjectList = function(){
    return projectModelService.getProjectList();
}

module.exports = projectService;