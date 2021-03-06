/**
 * Created by hewenbiao on 2015/11/6.
 */

var webApiModelService = require('./webApiModelService');

var webApiService = {};

webApiService.getVersionList = function(dbName){
    return webApiModelService.getVersionList(dbName);
};

webApiService.getWebApiDetail = function(dbName, version){
    return webApiModelService.getWebApiDetail(dbName, version);
};

module.exports = webApiService;