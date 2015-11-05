/**
 * Created by hewenbiao on 2015/11/4.
 */

var identityModelService = require('./identityModelService');
var Promise = require("mpromise");

var identityService = {};

identityService.getIdentity = function(){
    var id = 0;
    var promise = new Promise();

    console.log("get id...");

    identityModelService.getIdentity()
        .then(function(result){
            if(result && result.min_id){
                return result.min_id;
            }
            return identityModelService.createIdentity({min_id: 1000});
        })
        .then(function(result) {
            id = result;
            console.log("id: " + result);
            return identityModelService.updateIdentity({min_id: result + 1});
        })
        .then(function(){
            console.log("fulfill id...");
            promise.fulfill(id);
        },function(err) {
            console.log("update id failed...");
            promise.reject(err);
        })
    ;
    return promise;
};

identityService.updateIdentity = function(identity){
    return identityModelService.updateIdentity(identity);
}

module.exports = identityService;