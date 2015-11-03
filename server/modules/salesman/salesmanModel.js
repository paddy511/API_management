/**
 * Created by qinghaibo on 2015/9/25.
 */
var mongoose = require('mongoose');

var salesmanModel = {
    "_id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "addTime": Date,
    "updateTime": Date
};

var salesmanSchema = mongoose.Schema(salesmanModel);

module.exports = mongoose.model('Salesman', salesmanSchema);