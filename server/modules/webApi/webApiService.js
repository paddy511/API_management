/**
 * Created by hewenbiao on 2015/11/6.
 */

var webApiModelService = require('./webApiModelService');

var webApiService = {};

webApiService.getVersionList = function(projectName){
    return webApiModelService.getVersionList(projectName);
}


module.exports = webApiService;