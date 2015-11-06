/**
 * Created by hewenbiao on 2015/11/5.
 */
Projects = require('./projectModel');
var Promise = require("mpromise");

var projectModelService = {};

projectModelService.getProjectList = function(filter){
    return Projects.find(filter).exec(function(err){
        if(err){
            console.log("get project list failed: ");
            console.log(err);
        }
    });
};

projectModelService.getProjectName = function(filter){
    return Projects.findOne(filter).exec(function(err){
        if(err){
            console.log("get project name failed: ");
            console.log(err);
        }
    });
};

projectModelService.saveProject = function(project){
    var promise = new Promise();
    var db_project = new Projects(project);
    db_project.save(function(err){
        if(err){
            console.log("save project failed: ")
            console.log(err);
            promise.reject(err);
        }else {
            console.log("saved project successful !")
        }
        promise.fulfill();
    });
    return promise;
};


module.exports = projectModelService;