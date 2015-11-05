/**
 * Created by hewenbiao on 2015/11/5.
 */
var mongoose = require('mongoose');

var projectModel = {
    "_id": Number,
    "name": String
};

var projectSchema = mongoose.Schema(projectModel);

module.exports = mongoose.model('project', projectSchema);