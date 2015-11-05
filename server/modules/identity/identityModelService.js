/**
 * Created by hewenbiao on 2015/11/4.
 */

Identity = require('./identityModel');
var Promise = require("mpromise");

var identityModelService = {};

identityModelService.createIdentity = function(identity) {
    return Identity.create(identity,function(err, result) {
        if(err){
            console.log(err);
            return;
        }
        return result;
    })
}

identityModelService.getIdentity =function(){
    return Identity.findOne({}).exec(function(err){
        if(err){
            console.log("get identity err: ");
            console.log(err);
        }
    });
};

identityModelService.updateIdentity =function(identity){

    console.log("update identity...");
    console.log(identity);

    return Identity.update({min_id: identity.min_id-1}, {$set: identity}).exec(function(err){
        if(err){
            console.log(err);
        }
    });
};

module.exports = identityModelService;